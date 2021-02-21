import { DomainEvent } from "./DomainEvent";

export interface DomainEventSubscriber<T extends DomainEvent> {
    subscribedTo(): DomainEvent[];
    on(domainEvent: T): Promise<void>;
}
