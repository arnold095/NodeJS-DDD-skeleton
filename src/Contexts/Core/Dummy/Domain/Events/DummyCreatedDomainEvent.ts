import { DomainEvent } from '../../../../Shared/Domain/Bus/DomainEvent';
import { DummyPrimitives } from '../DummyPrimitives';

export class DummyCreatedDomainEvent extends DomainEvent {
  public static readonly eventName = 'core.dummy.dummy_created';

  public constructor(
    public readonly body: DummyPrimitives,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(body.id, DummyCreatedDomainEvent.eventName, eventId, occurredOn);
  }

  public static of(body: DummyPrimitives): DummyCreatedDomainEvent {
    return new DummyCreatedDomainEvent(body);
  }
}