import { EventBus } from "../../../../../src/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DomainEventSubscriber } from "../../../../../src/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { DomainEvent } from "../../../../../src/Contexts/Shared/Domain/Bus/Event/DomainEvent";

export class EventBusMock implements EventBus {
    private publishSpy = jest.fn();

    public addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        this.publishSpy(subscribers);
    }

    public async publish(domainEvents: DomainEvent[]): Promise<void> {
        return Promise.resolve(undefined);
    }

}