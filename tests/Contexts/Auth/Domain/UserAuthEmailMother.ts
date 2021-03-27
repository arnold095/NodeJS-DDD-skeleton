import { MotherCreator } from '../../Shared/Domain/MotherCreator';
import { UserAuthEmail } from "../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail";

export class UserAuthEmailMother extends MotherCreator {
    public static create(): UserAuthEmail {
        return new UserAuthEmail(this.random().internet.email());
    }
}
