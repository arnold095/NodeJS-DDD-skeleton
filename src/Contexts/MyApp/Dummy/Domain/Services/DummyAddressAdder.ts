import { DummyAddressId } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId';
import { DummyAddressAlias } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias';
import { DummyAddressStreet } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressStreet';
import { DummyAddressCity } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity';
import { DummyAddressPostalCode } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode';
import { DummyAddressCountry } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry';
import { DummyRepository } from '@/src/Contexts/MyApp/Dummy/Domain/DummyRepository';
import { DummyId } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId';
import { DummyNotFound } from '@/src/Contexts/MyApp/Dummy/Domain/Exception/DummyNotFound';
import { DummyAddress } from '@/src/Contexts/MyApp/DummyAddress/Domain/DummyAddress';
import { Dummy } from '@/src/Contexts/MyApp/Dummy/Domain/Dummy';
import { DummyAddressAlreadyExists } from '@/src/Contexts/MyApp/Dummy/Domain/Exception/DummyAddressAlreadyExists';
import { DateValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/DateValueObject';
import { DummyAddressDateAdd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd';
import { DummyAddressDateUpd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd';

export class DummyAddressAdder {
  constructor(private repository: DummyRepository) {}

  public async run(
    dummyAddressId: DummyAddressId,
    dummyId: DummyId,
    alias: DummyAddressAlias,
    street: DummyAddressStreet,
    city: DummyAddressCity,
    postalCode: DummyAddressPostalCode,
    country: DummyAddressCountry
  ): Promise<Dummy> {
    const dummy = await this.repository.find(dummyId);
    this.ensureDummyExists(dummy);
    this.ensureDummyAddressDoesntExists(dummy, dummyAddressId);
    const address = this.createAddress(
      dummyAddressId,
      dummyId,
      alias,
      street,
      city,
      postalCode,
      country
    );
    dummy.saveAddress(address);
    return dummy;
  }

  private ensureDummyExists(dummy) {
    if (undefined === dummy) {
      throw new DummyNotFound(`Dummy doesn't exist`);
    }
  }

  private ensureDummyAddressDoesntExists(dummy: Dummy, dummyAddressId: DummyAddressId) {
    const dummyAddress = dummy.findAddress(dummyAddressId);
    if (undefined !== dummyAddress) {
      throw new DummyAddressAlreadyExists(`Address already exists`);
    }
  }

  private createAddress(
    dummyAddressId,
    dummyId,
    alias,
    street,
    city,
    postalCode,
    country
  ): DummyAddress {
    const date = DateValueObject.currentDate().value;
    const dateAdd = new DummyAddressDateAdd(date);
    const dateUpd = new DummyAddressDateUpd(date);
    return new DummyAddress(
      dummyAddressId,
      dummyId,
      alias,
      street,
      city,
      postalCode,
      country,
      dateAdd,
      dateUpd
    );
  }
}
