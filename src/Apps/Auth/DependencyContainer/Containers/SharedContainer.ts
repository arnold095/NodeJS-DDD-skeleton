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
} from '@sharedInfra';
import { AdapterTypes } from '@sharedDomain';

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
