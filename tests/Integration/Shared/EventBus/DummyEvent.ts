import { DomainEvent } from '../../../../src/Contexts/Shared/Domain/Bus/DomainEvent';
import { UuidValueObject } from '../../../../src/Contexts/Shared/Domain/ValueObject/UuidValueObject';
import { StringMother } from '../../../ObjectMother/StringMother';

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
