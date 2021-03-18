import { UserAuthLastName } from "../../../../src/Contexts/Auth/Domain/ValueObject/UserAuthLastName";
import { MotherCreator } from "../../Shared/Domain/MotherCreator";

export class UserAuthLastNameMother extends MotherCreator {
    public static create(): UserAuthLastName {
        return new UserAuthLastName(this.random().name.lastName());
    }
}
