import { inject, injectable } from "inversify";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { DomainEventJsonSerializer } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonSerializer";

@injectable()
export class RabbitMQEventBus implements EventBus {
    private readonly exchangeName: string;

    public constructor(
        @inject('RabbitMQConnection') private readonly connection: RabbitMQConnection
    ) {
        this.exchangeName = process.env.RABBITMQ_EXCHANGE;
    }

    public addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {

    }

    public async publish(events: DomainEvent[]): Promise<void> {
        events.map(async event => {
            await this.publisher(event);
        })
    }

    private async publisher(event: DomainEvent): Promise<void> {
        try {
            await this.publishEvent(event);
        } catch (e) {
            console.log('TODO:: Fail publisher...');
        }
    }

    private async publishEvent(event: DomainEvent): Promise<void> {
        const eventParams = {
            routingKey: event.eventName,
            messageId: event.eventId,
            body: DomainEventJsonSerializer.serialize(event)
        };
        await this.connection.exchange(this.exchangeName, eventParams);
    }
}
