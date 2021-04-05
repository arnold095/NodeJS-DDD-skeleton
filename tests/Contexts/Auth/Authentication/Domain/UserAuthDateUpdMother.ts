import { MotherCreator } from "../../../Shared/Domain/MotherCreator";
import { UserAuthDateUpd } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateUpd";

export class UserAuthDateUpdMother extends MotherCreator {
    public static create(): UserAuthDateUpd {
        const date = this.random().date.recent(1);
        return new UserAuthDateUpd(date);
    }
}
