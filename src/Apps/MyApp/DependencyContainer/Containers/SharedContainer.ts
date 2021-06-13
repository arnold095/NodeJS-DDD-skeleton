import { RabbitMQDomainEventBus } from '@/src/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventBus';
import { TypeORMClient } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMClient';
import { TypeORMProvider } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMProvider';
import { DomainEventSubscriberLocator } from '@/src/Contexts/Shared/Infrastructure/EventBus/DomainEventSubscriberLocator';
import { DomainEventJsonDeserializer } from '@/src/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer';
import { DomainEventMapping } from '@/src/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';
import { RabbitMQDomainEventsConsumer } from '@/src/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventsConsumer';
import { RabbitMQConfigurator } from '@/src/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurator';
import { RabbitMQConnection } from '@/src/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection';
import { AdapterTypes } from '@/src/Contexts/Shared/Domain/Server/AdapterTypes';
import { KoaServer } from '@/src/Contexts/Shared/Infrastructure/Server/Koa/KoaServer';

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
