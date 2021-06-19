import { AdapterTypes } from '@sharedDomain';
import {
  ConsoleLogger,
  DomainEventJsonDeserializer,
  DomainEventMapping,
  DomainEventSubscriberLocator,
  KoaServer,
  RabbitMQConfigurator,
  RabbitMQConnection,
  RabbitMQDomainEventBus,
  RabbitMQDomainEventsConsumer,
  RedisProvider,
  RedisClient,
} from '@sharedInfra';

export class SharedContainer {
  public static container(): AdapterTypes {
    return {
      services: [
        RabbitMQConnection,
        RabbitMQConfigurator,
        RabbitMQDomainEventsConsumer,
        DomainEventMapping,
        DomainEventJsonDeserializer,
        DomainEventSubscriberLocator,
        RedisProvider,
        RedisClient,
      ],
      domainContracts: [
        {
          abstract: 'EventBus',
          concrete: RabbitMQDomainEventBus,
        },
        {
          abstract: 'WebServer',
          concrete: KoaServer,
        },
        {
          abstract: 'Logger',
          concrete: ConsoleLogger,
        },
      ],
    };
  }
}
