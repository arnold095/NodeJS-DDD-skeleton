import { ContainerTypes } from "../ContainerTypes";
import { RabbitMQDomainEventBus } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventBus";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { RabbitMQConfigurator } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurator";

export class SharedContainer {
    public static getContainer(): ContainerTypes {
        return {
            services: [
                RabbitMQConnection, RabbitMQConfigurator
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
