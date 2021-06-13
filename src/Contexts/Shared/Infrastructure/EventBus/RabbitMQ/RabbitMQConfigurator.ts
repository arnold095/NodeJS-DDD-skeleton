import { inject, injectable, multiInject, optional } from 'inversify';
import { Replies } from 'amqplib';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';
import { DomainEventSubscriber } from '@sharedDomain';
import { RabbitMQQueueNameFormatter } from './RabbitMQQueueNameFormatter';

@injectable()
export class RabbitMQConfigurator {
  public constructor(
    @inject('RabbitMQConnection') private connection: RabbitMQConnection,
    @multiInject('DomainEventSubscriber')
    @optional()
    private subscribers: DomainEventSubscriber[]
  ) {}

  public async configure(exchangeName: string): Promise<void> {
    const retryExchangeName = RabbitMQExchangeNameFormatter.retry(exchangeName);
    const deadLetterExchangeName = RabbitMQExchangeNameFormatter.deadLetter(exchangeName);
    await this.declareExchange(exchangeName);
    await this.declareExchange(retryExchangeName);
    await this.declareExchange(deadLetterExchangeName);
    await this.declareQueues(exchangeName, retryExchangeName, deadLetterExchangeName);
  }

  private async declareExchange(exchangeName: string) {
    await this.connection.exchange(exchangeName);
  }

  private async declareQueues(
    exchangeName: string,
    retryExchangeName: string,
    deadLetterExchangeName: string
  ): Promise<void> {
    this.subscribers.map(async (subscriber) => {
      await this.queueDeclarator(
        subscriber,
        exchangeName,
        retryExchangeName,
        deadLetterExchangeName
      );
    });
  }

  private async queueDeclarator(
    subscriber: DomainEventSubscriber,
    exchangeName: string,
    retryExchangeName: string,
    deadLetterExchangeName: string
  ): Promise<void> {
    const { channel } = this.connection;

    const queueName = RabbitMQQueueNameFormatter.format(subscriber);
    const retryQueueName = RabbitMQQueueNameFormatter.formatRetry(subscriber);
    const deadLetterQueueName = RabbitMQQueueNameFormatter.formatDeadLetter(subscriber);

    const queue = await this.declareQueue(queueName);
    const retryQueue = await this.declareQueue(
      retryQueueName,
      exchangeName,
      queueName,
      1000
    );
    const deadLetterQueue = await this.declareQueue(deadLetterQueueName);

    await channel.bindQueue(retryQueue.queue, retryExchangeName, queueName);
    await channel.bindQueue(deadLetterQueue.queue, deadLetterExchangeName, queueName);

    subscriber.subscribedTo().map(async (eventClass) => {
      await channel.bindQueue(queue.queue, exchangeName, eventClass.eventName);
    });
  }

  private async declareQueue(
    name: string,
    deadLetterExchange?: string,
    deadLetterRoutingKey?: string,
    messageTtl?: number
  ): Promise<Replies.AssertQueue> {
    const params = {
      durable: true,
      messageTtl,
      deadLetterExchange,
      deadLetterRoutingKey,
    };
    return await this.connection.queue(name, params);
  }
}
