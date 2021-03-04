import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";

export class DomainEventJsonSerializer {
    public static serialize(domainEvent: DomainEvent) {
        const attributes = {...domainEvent.toPrimitives(), ...{eventId: domainEvent.aggregateId}};
        return JSON.stringify({
            data: {
                id: domainEvent.eventId,
                type: domainEvent.eventName,
                occurred_on: domainEvent.occurredOn,
                attributes
            },
            meta: []
        })
    }
}
