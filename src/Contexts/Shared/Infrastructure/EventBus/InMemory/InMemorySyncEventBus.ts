import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { injectable } from "inversify";

type Subscription = {
    boundedCallback: (event: DomainEvent) => void;
};

@injectable()
export class InMemorySyncEventBus implements EventBus {
    private subscriptions: Map<string, [Subscription]>;

    public constructor() {
        this.subscriptions = new Map();
    }

    public async publish(domainEvents: DomainEvent[]): Promise<void> {
        const executions: any = [];
        domainEvents.map(event => {
            const subscribers = this.subscriptions.get(event.eventName);
            if (subscribers) {
                return subscribers.map(subscriber => {
                    executions.push(subscriber);
                });
            }
        });
        await Promise.all(executions);
    }

    public addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        subscribers.map(subscriber => {
            subscriber.subscribedTo().map(event => {
                this.subscribe(event.eventName, subscriber);
            });
        });
    }

    public subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
        const currentSubscriptions = this.subscriptions.get(topic);
        const subscription = {
            boundedCallback: subscriber.on.bind(subscriber)
        };
        if (currentSubscriptions) {
            currentSubscriptions.push(subscription);
        } else {
            this.subscriptions.set(topic, [subscription]);
        }
    }
}