import { Uuid } from '@sharedDomain';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  readonly eventId: string;
  readonly occurredOn: Date;

  protected constructor(
    readonly aggregateId: string,
    readonly eventName: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    this.eventId = eventId ?? Uuid.random().value;
    this.occurredOn = occurredOn ?? new Date();
  }

  public abstract toPrimitives(): Record<string, unknown>;

  public static fromPrimitives: (...args: never[]) => DomainEvent;
}
export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(...args: unknown[]): DomainEvent;
};
