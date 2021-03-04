import { injectable, multiInject } from "inversify";
import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { domainEvents } from "@/Contexts/Shared/Domain/Decorators/DomainEvent";

@injectable()
export class DomainEventMapping {
    private mapping: Map<string, any> = new Map();

    constructor(
    ) {
        this.addSubscribers(domainEvents);
    }

    public addSubscribers(domainEvents: DomainEvent[]): void {
        domainEvents.map(domainEvent => {
            this.mapping.set(domainEvent.eventName, domainEvent);
        });
    }

    public for(name: string) {
        if (undefined === this.mapping.get(name)) {
            throw new Error(`The Domain event class for ${name} doesn't exists or have no subscribers`);
        }
        return this.mapping.get(name);
    }
}
