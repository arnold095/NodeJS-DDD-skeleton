import * as map from 'source-map-support';
import 'reflect-metadata';
import {
  DomainEventSubscriberLocator,
  NodeDependencyInjectionIocAdapter,
  RabbitMQConfigurator,
  RabbitMQDomainEventsConsumer,
} from '@sharedInfra';
import { join } from 'path';

map.install();

export class ConsumeRabbitMQDomainEventsCommand {
  private exchangeName = process.env.RABBITMQ_EXCHANGE ?? 'domain_events';
  private iocAdapter = new NodeDependencyInjectionIocAdapter(
    join(__dirname, '../../DependencyContainer/Container.yaml')
  );

  private readonly consumer: RabbitMQDomainEventsConsumer;
  private readonly configurator: RabbitMQConfigurator;
  private readonly locator: DomainEventSubscriberLocator;

  constructor() {
    this.configurator = this.iocAdapter.get('Shared.RabbitMQConfigurator');
    this.consumer = this.iocAdapter.get('Shared.RabbitMQDomainEventsConsumer');
    this.locator = this.iocAdapter.get('Shared.DomainEventSubscriberLocator');
  }

  public async run(): Promise<void> {
    await this.configurator.configure(this.exchangeName);
    const consumerName = this.consumerName();
    const subscriber = this.locator.withRabbitMQQueueNamed(consumerName);
    await this.consumer.consume(subscriber, consumerName);
  }

  private consumerName(): string {
    const consumer = process.argv.find((arg) => arg.includes('consumer'));
    if (!consumer) {
      throw new Error('This consumer does not exist');
    }
    return consumer.replace('consumer:', '');
  }
}

const command = new ConsumeRabbitMQDomainEventsCommand();
command.run();
