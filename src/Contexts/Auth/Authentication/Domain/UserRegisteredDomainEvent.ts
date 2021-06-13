import { DomainEvent } from '@sharedDomain';

type UserRegisteredEventBody = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateAdd: Date;
  dateUpd: Date;
};

export class UserRegisteredDomainEvent extends DomainEvent {
  private static readonly _eventName = 'user.registered';

  public constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly dateAdd: Date,
    readonly dateUpd: Date,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(id, UserRegisteredDomainEvent.eventName, eventId, occurredOn);
  }

  public static get eventName(): string {
    return this._eventName;
  }

  public toPrimitives(): UserRegisteredEventBody {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      dateAdd: this.dateAdd,
      dateUpd: this.dateUpd,
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
      body.password,
      body.dateAdd,
      body.dateUpd,
      eventId,
      occurredOn
    );
  }
}
