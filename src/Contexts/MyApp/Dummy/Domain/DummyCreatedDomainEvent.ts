import { domainEvent, DomainEvent } from '@sharedDomain';

export type DummyCreatedDomainEventBody = {
  readonly title: string;
  readonly content: string;
  readonly email: string;
};

@domainEvent()
export class DummyCreatedDomainEvent extends DomainEvent {
  static readonly eventName = 'dummy.created';
  public constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
    readonly email: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(id, DummyCreatedDomainEvent.EVENT_NAME, eventId, occurredOn);
  }

  public toPrimitives(): DummyCreatedDomainEventBody {
    return {
      title: this.title,
      content: this.content,
      email: this.email,
    };
  }

  public static fromPrimitives(
    aggregateId: string,
    body: DummyCreatedDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DummyCreatedDomainEvent {
    return new DummyCreatedDomainEvent(
      aggregateId,
      body.title,
      body.content,
      body.email,
      eventId,
      occurredOn
    );
  }
}
