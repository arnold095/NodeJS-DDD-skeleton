import { DomainEvent } from "./DomainEvent";

export interface DomainEventSubscriber {
    subscribedTo(): DomainEvent[];

    on(domainEvent: DomainEvent): Promise<void>;
}
