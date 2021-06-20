import {
  ConsoleLogger,
  DomainEventJsonDeserializer,
  DomainEventMapping,
  DomainEventSubscriberLocator,
  KoaServer,
  MongoDbClient,
  MongoDbProvider,
  RabbitMQConfigurator,
  RabbitMQConnection,
  RabbitMQDomainEventBus,
  RabbitMQDomainEventsConsumer,
} from '@sharedInfra';
import { AdapterTypes } from '@sharedDomain';
import { ErrorHandler } from '../../../../Contexts/Shared/Infrastructure/Server/Koa/Middleware/ErrorHandler';

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
        MongoDbProvider,
        MongoDbClient,
        ErrorHandler,
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
