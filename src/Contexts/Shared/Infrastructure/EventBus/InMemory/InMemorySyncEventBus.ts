import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { injectable, multiInject } from "inversify";

@injectable()
export class InMemorySyncEventBus implements EventBus {
    private subscriptions: Map<string, [DomainEventSubscriber]> = new Map();

    public constructor(
        @multiInject('DomainEventSubscriber') private subscribers: DomainEventSubscriber[]
    ) {
    }

    public load() {
        this.subscribers.map(subscriber => {
            subscriber.subscribedTo().map(event => {
                this.subscribe(event.eventName, subscriber);
            });
        });
    }

    private subscribe(eventName: string, subscriber: DomainEventSubscriber) {
        const currentSubscriber = this.subscriptions.get(eventName);
        if (currentSubscriber) {
            currentSubscriber.push(subscriber);
        } else {
            this.subscriptions.set(eventName, [subscriber]);
        }
    }

    public async publish(domainEvents: DomainEvent[]): Promise<void> {
        domainEvents.map(event => {
            const subscribers = this.subscriptions.get(event.eventName);
            if (subscribers) {
                subscribers.map(async subscriber => {
                    await subscriber.on(event);
                });
            }
        });
    }
}
