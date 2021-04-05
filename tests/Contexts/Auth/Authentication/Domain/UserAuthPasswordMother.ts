import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { UserAuthPassword } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthPassword";

export class UserAuthPasswordMother extends MotherCreator {
    public static create(): UserAuthPassword {
        const password = `1. 3A` + this.random().internet.password();
        return new UserAuthPassword(password);
    }
}
