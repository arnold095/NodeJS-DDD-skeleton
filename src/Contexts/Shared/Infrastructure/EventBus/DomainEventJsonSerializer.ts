import { DomainEvent } from '@sharedDomain';

export class DomainEventJsonSerializer {
  public static serialize(domainEvent: DomainEvent): string {
    const attributes = {
      ...domainEvent.toPrimitives(),
      ...{ id: domainEvent.aggregateId },
    };
    return JSON.stringify({
      data: {
        id: domainEvent.eventId,
        type: domainEvent.eventName,
        occurred_on: domainEvent.occurredOn,
        attributes,
      },
      meta: [],
    });
  }
}
