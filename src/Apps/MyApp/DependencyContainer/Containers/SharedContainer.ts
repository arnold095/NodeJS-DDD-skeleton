import { ContainerTypes } from "../ContainerTypes";
import { RabbitMQDomainEventBus } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventBus";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { RabbitMQConfigurator } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurator";
import { RabbitMQDomainEventsConsumer } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventsConsumer";
import { DomainEventMapping } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping";
import { DomainEventJsonDeserializer } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer";
import { DomainEventSubscriberLocator } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventSubscriberLocator";
import { TypeORMProvider } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMProvider";
import { TypeORMClient } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMClient";

export class SharedContainer {
    public static container(): ContainerTypes {
        return {
            services: [
                RabbitMQConnection, RabbitMQConfigurator,
                RabbitMQDomainEventsConsumer, DomainEventMapping,
                DomainEventJsonDeserializer, DomainEventSubscriberLocator,
                TypeORMProvider, TypeORMClient
            ],
            buses: [
                {
                    abstract: 'EventBus',
                    concrete: RabbitMQDomainEventBus
                }
            ]
        };
    }
}
