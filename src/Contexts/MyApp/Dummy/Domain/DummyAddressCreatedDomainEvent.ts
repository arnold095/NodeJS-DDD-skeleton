import { domainEvent, DomainEvent } from '@sharedDomain';

type DummyAddressCreatedDomainEventBody = {
  id: string;
  dummyAddressId: string;
  alias: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  dateAdd: Date;
  dateUpd: Date;
};

@domainEvent()
export class DummyAddressCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'dummy_address.created';

  public constructor(
    private readonly id: string,
    private readonly dummyAddressId: string,
    private readonly alias: string,
    private readonly street: string,
    private readonly city: string,
    private readonly postalCode: string,
    private readonly country: string,
    private readonly dateAdd: Date,
    private readonly dateUpd: Date,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(id, DummyAddressCreatedDomainEvent.EVENT_NAME, eventId, occurredOn);
  }

  public toPrimitives(): DummyAddressCreatedDomainEventBody {
    return {
      id: this.id,
      dummyAddressId: this.dummyAddressId,
      alias: this.alias,
      street: this.street,
      city: this.city,
      postalCode: this.postalCode,
      country: this.country,
      dateAdd: this.dateAdd,
      dateUpd: this.dateUpd,
    };
  }
}
