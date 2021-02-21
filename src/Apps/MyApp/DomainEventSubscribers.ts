import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { eventSubscribers } from "@/Contexts/Shared/Domain/Decorators/EventSubscriber";
import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";

export class DomainEventSubscribers {
    public constructor(private readonly container: InversifyAdapter) {

    }

    public load() {
        const subscribers: DomainEventSubscriber<DomainEvent>[] = [];
        const eventBus: EventBus = this.container.getClass('EventBus');
        eventSubscribers.map(event => {
            subscribers.push(this.container.getClass(event.name));
        });
        eventBus.addSubscribers(subscribers);
    }
}
