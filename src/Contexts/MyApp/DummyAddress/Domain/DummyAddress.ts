import { DummyId } from '@dummy';
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
export class DummyAddress {
  public constructor(
    private _id: DummyAddressId,
    private _dummyId: DummyId,
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
    dummyId: DummyId,
    alias: DummyAddressAlias,
    street: DummyAddressStreet,
    city: DummyAddressCity,
    postalCode: DummyAddressPostalCode,
    country: DummyAddressCountry
  ): DummyAddress {
    const date = DateValueObject.currentDate().value;
    return new DummyAddress(
      id,
      dummyId,
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

  get dummyId(): DummyId {
    return this._dummyId;
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
}
