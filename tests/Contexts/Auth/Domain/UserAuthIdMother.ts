import { UserAuthId } from "../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId";
import { UuidMother } from "../../Shared/Domain/UuidMother";

export class UserAuthIdMother extends UuidMother {
    static create(): UserAuthId {
        return new UserAuthId(this.random());
    }
}
