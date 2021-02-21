import { DomainEvent } from "./DomainEvent";
import { DomainEventSubscriber } from "./DomainEventSubscriber";

export interface EventBus {
    publish(domainEvents: DomainEvent[]): void;

    addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void;
}
