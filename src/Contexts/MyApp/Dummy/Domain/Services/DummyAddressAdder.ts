import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { DummyAddressAlias } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias";
import { DummyAddressStreet } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressStreet";
import { DummyAddressCity } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity";
import { DummyAddressPostalCode } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode";
import { DummyAddressCountry } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry";
import { DummyRepository } from "@/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DummyNotFound } from "@/Contexts/MyApp/Dummy/Domain/Exception/DummyNotFound";
import { DummyAddress } from "@/Contexts/MyApp/DummyAddress/Domain/DummyAddress";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { DummyAddressAlreadyExists } from "@/Contexts/MyApp/Dummy/Domain/Exception/DummyAddressAlreadyExists";
import { DateValueObject } from "@/Contexts/Shared/Domain/ValueObject/DateValueObject";
import { DummyAddressDateAdd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd";
import { DummyAddressDateUpd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd";

export class DummyAddressAdder {
    constructor(
        private repository: DummyRepository
    ) {

    }

    public async run(dummyAddressId: DummyAddressId,
                     dummyId: DummyId, alias: DummyAddressAlias,
                     street: DummyAddressStreet, city: DummyAddressCity,
                     postalCode: DummyAddressPostalCode, country: DummyAddressCountry): Promise<Dummy> {
        const dummy = await this.repository.find(dummyId);
        this.ensureDummyExists(dummy);
        this.ensureDummyAddressDoesntExists(dummy, dummyAddressId);
        const address = this.createAddress(dummyAddressId, dummyId, alias,
            street, city, postalCode, country);
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

    private createAddress(dummyAddressId, dummyId, alias,
                          street, city, postalCode, country): DummyAddress {
        const date = DateValueObject.currentDate().value;
        const dateAdd = new DummyAddressDateAdd(date);
        const dateUpd = new DummyAddressDateUpd(date);
        return new DummyAddress(dummyAddressId, dummyId, alias,
            street, city, postalCode, country, dateAdd, dateUpd);
    }
}
