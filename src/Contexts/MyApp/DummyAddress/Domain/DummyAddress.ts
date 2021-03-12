import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { DummyAddressAlias } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias";
import { DummyAddressCity } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity";
import { DummyStreet } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyStreet";
import { DumyAddressPostalCode } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DumyAddressPostalCode";
import { DummyAddressCountry } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry";

export class DummyAddress {
    public constructor(private _id: DummyAddressId, private _alias: DummyAddressAlias,
                       private _street: DummyStreet, private _city: DummyAddressCity,
                       private _postalCode: DumyAddressPostalCode,
                       private _country: DummyAddressCountry) {
    }
    

}
