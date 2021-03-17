import { DomainEvent } from '@/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { domainEvent } from "@/Contexts/Shared/Domain/Decorators/DomainEvent";

type DummyAddressCreatedDomainEventBody = {
    id: string;
    dummyAddressId: string;
    alias: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    dateAdd: Date,
    dateUpd: Date,
}

@domainEvent()
export class DummyAddressCreatedDomainEvent extends DomainEvent {
    private static readonly _eventName = 'dummy_address.created';

    public constructor(private readonly _id: string,
                       private readonly _dummyAddressId: string,
                       private readonly _alias: string,
                       private readonly _street: string,
                       private readonly _city: string,
                       private readonly _postalCode: string,
                       private readonly _country: string,
                       private readonly _dateAdd: Date,
                       private readonly _dateUpd: Date,
                       eventId?: string, occurredOn?: Date) {
        super(_id, DummyAddressCreatedDomainEvent.eventName, eventId, occurredOn)
    }

    public static get eventName(): string {
        return this._eventName;
    }

    get id(): string {
        return this._id;
    }

    get dummyAddressId(): string {
        return this._dummyAddressId;
    }

    get alias(): string {
        return this._alias;
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get postalCode(): string {
        return this._postalCode;
    }

    get country(): string {
        return this._country;
    }

    get dateAdd(): Date {
        return this._dateAdd;
    }

    get dateUpd(): Date {
        return this._dateUpd;
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
            dateUpd: this.dateUpd
        };
    }
}
