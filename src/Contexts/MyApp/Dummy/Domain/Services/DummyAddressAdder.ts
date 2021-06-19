import { DummyRepository } from '../DummyRepository';
import {
  DummyAddress,
  DummyAddressAlias,
  DummyAddressCity,
  DummyAddressCountry,
  DummyAddressDateAdd,
  DummyAddressDateUpd,
  DummyAddressId,
  DummyAddressPostalCode,
  DummyAddressStreet,
} from '@dummyAddress';
import { DummyId } from '../ValueObject/DummyId';
import { Dummy } from '../Dummy';
import { DummyNotFound } from '../Exception/DummyNotFound';
import { DummyAddressAlreadyExists } from '../Exception/DummyAddressAlreadyExists';
import { DateValueObject } from '@sharedDomain';

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

  private ensureDummyExists(dummy: Dummy) {
    if (undefined === dummy) {
      throw new DummyNotFound(404, `Dummy doesn't exist`);
    }
  }

  private ensureDummyAddressDoesntExists(dummy: Dummy, dummyAddressId: DummyAddressId) {
    const dummyAddress = dummy.findAddress(dummyAddressId);
    if (undefined !== dummyAddress) {
      throw new DummyAddressAlreadyExists(400, `Address already exists`);
    }
  }

  private createAddress(
    dummyAddressId: DummyAddressId,
    dummyId: DummyId,
    alias: DummyAddressAlias,
    street: DummyAddressStreet,
    city: DummyAddressCity,
    postalCode: DummyAddressPostalCode,
    country: DummyAddressCountry
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
