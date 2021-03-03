import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { inject, injectable } from "inversify";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { DomainEventJsonSerializer } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonSerializer";
import { RabbitMQConfigurator } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurator";

@injectable()
export class RabbitMQDomainEventBus implements EventBus {
    private readonly exchangeName: string;

    public constructor(
        @inject('RabbitMQConnection') private readonly connection: RabbitMQConnection,
        @inject('RabbitMQConfigurator') private readonly configurator: RabbitMQConfigurator
    ) {
        this.exchangeName = process.env.RABBITMQ_EXCHANGE;
    }

    public async load(): Promise<void> {
        console.log('Declare exchange and queues...', this.exchangeName);
       await this.configurator.configure(this.exchangeName);
    }

    public async publish(domainEvents: DomainEvent[]): Promise<void> {
        domainEvents.map(async event => {
            await this.publisher(event);
        });
    }

    private async publisher(event: DomainEvent) {
        try {
            await this.publishEvent(event);
        } catch (err) {
            console.log(err);
            console.log(`TODO:: Fail publisher`);
        }
    }

    private async publishEvent(event: DomainEvent) {
        const serializedBody = DomainEventJsonSerializer.serialize(event);
        const routingKey = event.eventName;
        const body = Buffer.from(serializedBody);
        const messageId = event.eventId;
        await this.connection.exchange(this.exchangeName);
        this.connection.channel.publish(this.exchangeName, routingKey, body, {
            messageId,
            contentType: 'application/json',
            contentEncoding: 'utf-8'
        });
        console.log("[x] Sent %s:'%s' ", routingKey, serializedBody);
    }
}
