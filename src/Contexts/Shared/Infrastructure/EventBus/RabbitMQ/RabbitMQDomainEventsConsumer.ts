import { ConsumeMessage } from 'amqplib/properties';
import { RabbitMQConnection } from './RabbitMQConnection';
import { DomainEventSubscriber, Logger } from '@sharedDomain';
import { DomainEventJsonDeserializer } from '../DomainEventJsonDeserializer';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';

export class RabbitMQDomainEventsConsumer {
  private readonly exchangeName = process.env.RABBITMQ_EXCHANGE ?? 'domain_events';
  private readonly maxRetries = parseInt(process.env.RABBITMQ_MAX_RETRIES ?? '5');

  public constructor(
    private readonly connection: RabbitMQConnection,
    private readonly deserializer: DomainEventJsonDeserializer,
    private readonly logger: Logger
  ) {}

  public async consume(
    subscriber: DomainEventSubscriber,
    queueName: string
  ): Promise<void> {
    try {
      this.logger.info(`Waiting for messages subscribed to the consumer ${queueName}`);
      await this.connection.checkConnection();
      await this.connection.channel.consume(queueName, async (msg) => {
        if (msg) {
          await this.consumer(msg, subscriber, queueName);
          this.connection.channel.ack(msg);
        }
      });
    } catch (err) {
      // We don't want to raise an error if there are no messages in the queue
      this.logger.error('An error occurred while consuming the event', err);
    }
  }

  private async consumer(
    msg: ConsumeMessage,
    subscriber: DomainEventSubscriber,
    queueName: string
  ): Promise<void> {
    const content = msg.content.toString();
    const event = this.deserializer.deserialize(content);
    this.logger.info(`Consuming event: ${event.eventName}`);
    try {
      await subscriber.on(event);
    } catch (error) {
      await this.handleConsumptionError(msg, queueName);
      throw error;
    }
  }

  // TODO: implement failed queue publishing
  private async handleConsumptionError(msg: ConsumeMessage, queue: string) {
    if (this.hasBeenRedeliveredToMuch(msg)) {
      this.sendToDeadLetter(msg, queue);
    } else {
      this.sendToRetry(msg, queue);
    }
    this.connection.channel.ack(msg);
  }

  private hasBeenRedeliveredToMuch(msg: ConsumeMessage) {
    const retries = msg.properties.headers.redelivery_count ?? 0;
    return retries >= this.maxRetries;
  }

  private sendToRetry(msg: ConsumeMessage, queue: string) {
    const exchangeName = RabbitMQExchangeNameFormatter.retry(this.exchangeName);
    this.sendMessageTo(exchangeName, msg, queue);
  }

  private sendToDeadLetter(msg: ConsumeMessage, queue: string) {
    const exchangeName = RabbitMQExchangeNameFormatter.deadLetter(this.exchangeName);
    this.sendMessageTo(exchangeName, msg, queue);
  }

  private sendMessageTo(exchangeName: string, msg: ConsumeMessage, queue: string) {
    const retries = msg.properties.headers.redelivery_count ?? 0;
    this.connection.channel.publish(exchangeName, queue, Buffer.from(msg.content), {
      messageId: msg.properties.messageId,
      contentType: msg.properties.contentType,
      contentEncoding: msg.properties.contentEncoding,
      headers: {
        redelivery_count: parseInt(retries) + 1,
      },
    });
  }
}
