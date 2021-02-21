import { inject } from "inversify";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";

export class RabbitMQEventBus implements EventBus{
    public constructor(
        @inject('RabbitMQConnection') private readonly connection: RabbitMQConnection,
        private exchangeName: string
    ) {
    }

    public addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        
    }

    public async publish(events: DomainEvent[]):Promise<void> {
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
            body: ''
        };
        await this.connection.exchange(this.exchangeName, eventParams);
    }
}
