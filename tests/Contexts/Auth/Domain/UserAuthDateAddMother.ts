import { MotherCreator } from "../../Shared/Domain/MotherCreator";
import { UserAuthDateAdd } from "../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateAdd";

export class UserAuthDateAddMother extends MotherCreator {
    public static create(): UserAuthDateAdd {
        const date = this.random().date.recent(1);
        return new UserAuthDateAdd(date);
    }
}
