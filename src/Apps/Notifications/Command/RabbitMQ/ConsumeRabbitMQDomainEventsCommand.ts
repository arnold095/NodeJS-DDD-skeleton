import 'reflect-metadata';
import 'module-alias/register';
import * as map from 'source-map-support';
import {
  DomainEventSubscriberLocator,
  RabbitMQConfigurator,
  RabbitMQDomainEventsConsumer,
} from '@sharedInfra';
import { InversifyAdapter } from '../../DependencyContainer/InversifyAdapter';

map.install();

export class ConsumeRabbitMQDomainEventsCommand {
  private exchangeName = process.env.RABBITMQ_EXCHANGE ?? 'domain_events';
  private readonly consumer: RabbitMQDomainEventsConsumer;
  private readonly configurator: RabbitMQConfigurator;
  private readonly locator: DomainEventSubscriberLocator;
  private readonly container: InversifyAdapter;

  constructor() {
    this.container = new InversifyAdapter();
    this.configurator = this.container.getClass('RabbitMQConfigurator');
    this.consumer = this.container.getClass('RabbitMQDomainEventsConsumer');
    this.locator = this.container.getClass('DomainEventSubscriberLocator');
  }

  public async run(): Promise<void> {
    const queueName = this.queue();
    await this.configurator.configure(this.exchangeName);
    const subscriber = this.locator.withRabbitMQQueueNamed(queueName);
    await this.consumer.consume(subscriber, queueName);
  }

  private queue(): string {
    const queue = process.argv.find((arg) => arg.includes('queue'));
    if (!queue) {
      throw new Error('This queue does not exist');
    }
    return queue.replace('queue:', '');
  }
}

const command = new ConsumeRabbitMQDomainEventsCommand();
command.run();
