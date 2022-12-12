import { DomainEvent, UuidValueObject } from '../../../../../src/Contexts/Shared/Domain';
import { StringMother } from '../../../../ObjectMother';

export class DummyEvent extends DomainEvent {
  public static readonly eventName = 'dummy.event';

  public constructor(
    public readonly body: { id: string; name: string },
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(body.id, DummyEvent.eventName, eventId, occurredOn);
  }

  public static random(): DummyEvent {
    return new DummyEvent({
      id: UuidValueObject.random().value,
      name: StringMother.random(),
    });
  }
}
