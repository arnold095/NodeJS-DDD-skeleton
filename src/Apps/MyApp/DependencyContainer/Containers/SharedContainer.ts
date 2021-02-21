import { ContainerTypes } from "../ContainerTypes";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { RabbitMQEventBus } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQEventBus";

export class SharedContainer {
    public static getContainer(): ContainerTypes {
        return {
            services: [
                RabbitMQConnection
            ],
            buses: [
                {
                    abstract: 'EventBus',
                    concrete: RabbitMQEventBus
                },
            ]
        };
    }
}
