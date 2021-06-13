import { inject, injectable } from 'inversify';
import { DomainEvent } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { DomainEventMapping } from '@/src/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';

@injectable()
export class DomainEventJsonDeserializer {
  public constructor(
    @inject('DomainEventMapping') private readonly mapping: DomainEventMapping
  ) {}

  public deserialize(domainEvent: string): DomainEvent {
    const eventData = JSON.parse(domainEvent);
    const eventName = eventData.data.type;
    const eventClass = this.mapping.for(eventName);
    return eventClass.fromPrimitives(
      eventData.data.attributes.id,
      eventData.data.attributes,
      eventData.data.id,
      eventData.data.occurred_on
    );
  }
}
