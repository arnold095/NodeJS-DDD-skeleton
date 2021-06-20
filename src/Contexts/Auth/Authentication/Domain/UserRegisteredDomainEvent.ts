import { domainEvent, DomainEvent } from '@sharedDomain';

type UserRegisteredEventBody = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

@domainEvent()
export class UserRegisteredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.registered';

  public constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(id, UserRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn);
  }

  public toPrimitives(): UserRegisteredEventBody {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }

  public static fromPrimitives(
    aggregateId: string,
    body: UserRegisteredEventBody,
    eventId: string,
    occurredOn: Date
  ): UserRegisteredDomainEvent {
    return new UserRegisteredDomainEvent(
      aggregateId,
      body.firstName,
      body.lastName,
      body.email,
      eventId,
      occurredOn
    );
  }
}
