import { DomainEventMapping } from '@sharedInfra';
import { DomainEvent } from '@sharedDomain';

export class DomainEventJsonDeserializer {
  public constructor(private readonly mapping: DomainEventMapping) {}

  public deserialize(domainEvent: string): DomainEvent {
    const eventData = JSON.parse(domainEvent);
    const eventName = eventData.data.type;
    const eventClass = this.mapping.for(eventName);
    return eventClass.fromPrimitives(
      eventData.data.attributes,
      eventData.data.id,
      eventData.data.occurred_on
    );
  }
}
