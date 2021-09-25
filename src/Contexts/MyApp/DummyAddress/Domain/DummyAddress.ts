import {
  DummyAddressDateUpd,
  DummyAddressId,
  DummyAddressAlias,
  DummyAddressStreet,
  DummyAddressCity,
  DummyAddressPostalCode,
  DummyAddressCountry,
  DummyAddressDateAdd,
} from '@dummyAddress';
import { DateValueObject } from '@sharedDomain';

export type DummyAddressPrimitives = {
  id: string;
  alias: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  dateAdd: Date;
  dateUpd: Date;
};

export class DummyAddress {
  public constructor(
    private _id: DummyAddressId,
    private _alias: DummyAddressAlias,
    private _street: DummyAddressStreet,
    private _city: DummyAddressCity,
    private _postalCode: DummyAddressPostalCode,
    private _country: DummyAddressCountry,
    private _dateAdd: DummyAddressDateAdd,
    private _dateUpd: DummyAddressDateUpd
  ) {}

  public static create(
    id: DummyAddressId,
    alias: DummyAddressAlias,
    street: DummyAddressStreet,
    city: DummyAddressCity,
    postalCode: DummyAddressPostalCode,
    country: DummyAddressCountry
  ): DummyAddress {
    const date = DateValueObject.currentDate().value;
    return new DummyAddress(
      id,
      alias,
      street,
      city,
      postalCode,
      country,
      new DummyAddressDateAdd(date),
      new DummyAddressDateUpd(date)
    );
  }

  get id(): DummyAddressId {
    return this._id;
  }

  get alias(): DummyAddressAlias {
    return this._alias;
  }

  get street(): DummyAddressStreet {
    return this._street;
  }

  get city(): DummyAddressCity {
    return this._city;
  }

  get postalCode(): DummyAddressPostalCode {
    return this._postalCode;
  }

  get country(): DummyAddressCountry {
    return this._country;
  }

  get dateAdd(): DummyAddressDateAdd {
    return this._dateAdd;
  }

  get dateUpd(): DummyAddressDateUpd {
    return this._dateUpd;
  }

  public toPrimitives(): DummyAddressPrimitives {
    return {
      id: this._id.value,
      alias: this._alias.value,
      street: this._street.value,
      city: this._city.value,
      postalCode: this._postalCode.value,
      country: this._country.value,
      dateAdd: this._dateAdd.value,
      dateUpd: this._dateAdd.value,
    };
  }

  public static fromPrimitives(primitives: DummyAddressPrimitives): DummyAddress {
    return new DummyAddress(
      new DummyAddressId(primitives.id),
      new DummyAddressAlias(primitives.alias),
      new DummyAddressStreet(primitives.street),
      new DummyAddressCity(primitives.city),
      new DummyAddressPostalCode(primitives.postalCode),
      new DummyAddressCountry(primitives.country),
      new DummyAddressDateAdd(primitives.dateAdd),
      new DummyAddressDateUpd(primitives.dateUpd)
    );
  }
}
