import { AggregateRoot, Nullable } from '@sharedDomain';
import { DummyAddress, DummyAddressId, DummyAddressPrimitives } from '@dummyAddress';
import {
  DummyId,
  DummyTitle,
  DummyContent,
  DummyEmail,
  DummyCreatedDomainEvent,
  DummyAddressCreatedDomainEvent,
  DummyAddressAlreadyExists,
} from '@dummy';

export type DummyPrimitives = {
  id: string;
  title: string;
  content: string;
  email: string;
  addresses: DummyAddressPrimitives[];
};

export class Dummy extends AggregateRoot {
  constructor(
    private _id: DummyId,
    private _title: DummyTitle,
    private _content: DummyContent,
    private _email: DummyEmail,
    private _addresses: DummyAddress[] = []
  ) {
    super();
  }

  public static create(
    id: DummyId,
    title: DummyTitle,
    content: DummyContent,
    email: DummyEmail
  ): Dummy {
    const dummy = new Dummy(id, title, content, email);
    dummy.record(
      new DummyCreatedDomainEvent(id.value, title.value, content.value, email.value)
    );
    return dummy;
  }

  public addAddress(dummyAddress: DummyAddress): void {
    this.ensureThatTheAddressDoesNotExist(dummyAddress);
    this._addresses.push(dummyAddress);
    const domainEvent = new DummyAddressCreatedDomainEvent(
      this.id.value,
      dummyAddress.id.value,
      dummyAddress.alias.value,
      dummyAddress.street.value,
      dummyAddress.city.value,
      dummyAddress.postalCode.value,
      dummyAddress.country.value,
      dummyAddress.dateAdd.value,
      dummyAddress.dateUpd.value
    );
    this.record(domainEvent);
  }

  private ensureThatTheAddressDoesNotExist(dummyAddress: DummyAddress) {
    const addressFound = this.findAddress(dummyAddress.id);
    if (undefined !== addressFound) {
      throw new DummyAddressAlreadyExists(400, `Address already exists`);
    }
  }

  public get id(): DummyId {
    return this._id;
  }

  public get title(): DummyTitle {
    return this._title;
  }

  public get content(): DummyContent {
    return this._content;
  }

  public get email(): DummyEmail {
    return this._email;
  }

  public get addresses(): DummyAddress[] {
    return this._addresses;
  }

  public findAddress(id: DummyAddressId): Nullable<DummyAddress> {
    return this.addresses.find((address) => address.id.equals(id));
  }

  public toPrimitives(): DummyPrimitives {
    const addresses = this._addresses.map((address) => address.toPrimitives());
    return {
      id: this.id.value,
      title: this.title.value,
      content: this.content.value,
      email: this.email.value,
      addresses,
    };
  }

  public static fromPrimitives(primitives: DummyPrimitives): Dummy {
    const addresses = primitives?.addresses.map((address) =>
      DummyAddress.fromPrimitives(address)
    );
    return new Dummy(
      new DummyId(primitives.id),
      new DummyTitle(primitives.title),
      new DummyContent(primitives.content),
      new DummyEmail(primitives.email),
      addresses
    );
  }
}
