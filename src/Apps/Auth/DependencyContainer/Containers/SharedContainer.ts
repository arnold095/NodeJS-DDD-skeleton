import {
  DomainEventJsonDeserializer,
  DomainEventMapping,
  DomainEventSubscriberLocator,
  KoaServer,
  RabbitMQConfigurator,
  RabbitMQConnection,
  RabbitMQDomainEventBus,
  RabbitMQDomainEventsConsumer,
  TypeORMClient,
  TypeORMProvider,
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
        TypeORMProvider,
        TypeORMClient,
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
      ],
    };
  }
}
