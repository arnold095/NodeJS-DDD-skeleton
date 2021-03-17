import { AggregateRoot } from "@/Contexts/Shared/Domain/Aggregate/AggregateRoot";
import { DummyCreatedDomainEvent } from "./DummyCreatedDomainEvent";
import { DummyContent } from "./ValueObject/DummyContent";
import { DummyEmail } from "./ValueObject/DummyEmail";
import { DummyId } from "./ValueObject/DummyId";
import { DummyTitle } from "./ValueObject/DummyTitle";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { DummyAddress } from "@/Contexts/MyApp/DummyAddress/Domain/DummyAddress";
import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { DummyAddressCreatedDomainEvent } from "@/Contexts/MyApp/Dummy/Domain/DummyAddressCreatedDomainEvent";

export class Dummy extends AggregateRoot implements DomainModel {
    private _addresses: DummyAddress[] = [];

    constructor(private _id: DummyId, private _title: DummyTitle,
                private _content: DummyContent, private _email: DummyEmail) {
        super();
    }

    public static create(id: DummyId, title: DummyTitle,
                         content: DummyContent, email: DummyEmail): Dummy {
        const dummy = new Dummy(id, title, content, email);
        dummy.record(new DummyCreatedDomainEvent(
            id.value, title.value, content.value,
            email.value
        ));
        return dummy;
    }

    public saveAddress(dummyAddress: DummyAddress) {
        this._addresses.push(dummyAddress);
        const domainEvent = new DummyAddressCreatedDomainEvent(
            this.id.value, dummyAddress.id.value,
            dummyAddress.alias.value, dummyAddress.street.value,
            dummyAddress.city.value, dummyAddress.postalCode.value,
            dummyAddress.country.value, dummyAddress.dateAdd.value,
            dummyAddress.dateUpd.value,
        );
        this.record(domainEvent);
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

    public findAddress(id: DummyAddressId): DummyAddress {
        return this.addresses.find(address => address.id.equals(id));
    }
}
