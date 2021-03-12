import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { DummyAddressAlias } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias";
import { DummyAddressCity } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity";
import { DummyStreet } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyStreet";
import { DumyAddressPostalCode } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DumyAddressPostalCode";
import { DummyAddressCountry } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry";
import { DummyAddressDateAdd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd";
import { DummyAddressDateUpd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DateValueObject } from "@/Contexts/Shared/Domain/ValueObject/DateValueObject";

export class DummyAddress {
    public constructor(private _id: DummyAddressId,
                       private _dummyId: DummyId,
                       private _alias: DummyAddressAlias,
                       private _street: DummyStreet,
                       private _city: DummyAddressCity,
                       private _postalCode: DumyAddressPostalCode,
                       private _country: DummyAddressCountry,
                       private _dateAdd: DummyAddressDateAdd,
                       private _dateUpd: DummyAddressDateUpd) {
    }

    public static create(id: DummyAddressId, dummyId: DummyId,
                         alias: DummyAddressAlias, street: DummyStreet,
                         city: DummyAddressCity, postalCode: DumyAddressPostalCode,
                         country: DummyAddressCountry): DummyAddress {
        const date = DateValueObject.currentDate().value;
        return new DummyAddress(id, dummyId, alias,
            street, city, postalCode,
            country, new DummyAddressDateAdd(date), new DummyAddressDateUpd(date));
    }
}
