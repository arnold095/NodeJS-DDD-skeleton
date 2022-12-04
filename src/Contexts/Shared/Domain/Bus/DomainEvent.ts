import { UuidValueObject } from '../ValueObject/UuidValueObject';

export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;

  protected constructor(
    public readonly aggregateId: string,
    public readonly eventName: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    this.eventId = eventId ?? UuidValueObject.random().value;
    this.occurredOn = occurredOn ?? new Date();
  }
}
