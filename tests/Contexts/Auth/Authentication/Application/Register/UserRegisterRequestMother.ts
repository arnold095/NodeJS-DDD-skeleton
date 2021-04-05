import { UserRegisterRequest } from "../../../../../../src/Contexts/Auth/Authentication/Application/UserRegisterRequest";
import { UserAuthIdMother } from "../../Domain/UserAuthIdMother";
import { UserAuthFirstNameMother } from "../../Domain/UserAuthFirstNameMother";
import { UserAuthLastNameMother } from "../../Domain/UserAuthLastNameMother";
import { UserAuthEmailMother } from "../../Domain/UserAuthEmailMother";
import { UserAuthPasswordMother } from "../../Domain/UserAuthPasswordMother";

export class UserRegisterRequestMother {
    public static create(
        id?: string, email?: string,
        firstName?: string, lastName?: string,
        password?: string
    ) {
        return new UserRegisterRequest(
            id ?? UserAuthIdMother.create().value,
            firstName ?? UserAuthFirstNameMother.create().value,
            lastName ?? UserAuthLastNameMother.create().value,
            email ?? UserAuthEmailMother.create().value,
            password ?? UserAuthPasswordMother.create().value
        );
    }
}
