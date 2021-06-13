import 'module-alias/register';
import * as map from 'source-map-support';
import 'reflect-metadata';
import { DomainEventSubscriberLocator, RabbitMQDomainEventsConsumer } from '@sharedInfra';
import { InversifyAdapter } from '../../DependencyContainer/InversifyAdapter';

map.install();

export class ConsumeRabbitMQDomainEventsCommand {
  private readonly consumer: RabbitMQDomainEventsConsumer;
  private readonly locator: DomainEventSubscriberLocator;
  private readonly container: InversifyAdapter;

  constructor() {
    this.container = new InversifyAdapter();
    this.consumer = this.container.getClass('RabbitMQDomainEventsConsumer');
    this.locator = this.container.getClass('DomainEventSubscriberLocator');
  }

  public async run(): Promise<void> {
    const queueName = this.queue();
    const subscriber = this.locator.withRabbitMQQueueNamed(queueName);
    await this.consumer.consume(subscriber, queueName);
  }

  private queue(): string {
    const queue = process.argv.find((arg) => arg.includes('queue'));
    if (queue === '') {
      throw new Error('This queue does not exist');
    }
    return queue.replace('queue:', '');
  }
}

const command = new ConsumeRabbitMQDomainEventsCommand();
command.run();
