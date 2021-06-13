import { DummyAddressId } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId';
import { DummyAddressAlias } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias';
import { DummyAddressCity } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity';
import { DummyAddressStreet } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressStreet';
import { DummyAddressPostalCode } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode';
import { DummyAddressCountry } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry';
import { DummyAddressDateAdd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd';
import { DummyAddressDateUpd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd';
import { DummyId } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId';
import { DateValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/DateValueObject';
import { DomainModel } from '@/src/Contexts/Shared/Domain/Model/DomainModel';

export class DummyAddress implements DomainModel {
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
