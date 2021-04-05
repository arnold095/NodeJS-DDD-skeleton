import { UserAuth } from "../../../../../src/Contexts/Auth/Authentication/Domain/UserAuth";
import { UserAuthId } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId";
import { UserAuthFirstName } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName";
import { UserAuthEmail } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail";
import { UserAuthPassword } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthPassword";
import { UserAuthIdMother } from "./UserAuthIdMother";
import { UserAuthFirstNameMother } from "./UserAuthFirstNameMother";
import { UserAuthLastNameMother } from "./UserAuthLastNameMother";
import { UserAuthEmailMother } from "./UserAuthEmailMother";
import { UserAuthPasswordMother } from "./UserAuthPasswordMother";
import { UserAuthDateAdd } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateAdd";
import { UserAuthDateUpd } from "../../../../../src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateUpd";
import { UserAuthDateAddMother } from "./UserAuthDateAddMother";
import { UserAuthDateUpdMother } from "./UserAuthDateUpdMother";

export class UserAuthMother {
    public static create(id?: UserAuthId, firstName?: UserAuthFirstName,
                         lastName?: UserAuthLastName, email?: UserAuthEmail,
                         password?: UserAuthPassword, dateAdd?: UserAuthDateAdd,
                         dateUpd?:UserAuthDateUpd): UserAuth {
        return new UserAuth(
            id ?? UserAuthIdMother.create(),
            firstName ?? UserAuthFirstNameMother.create(),
            lastName ?? UserAuthLastNameMother.create(),
            email ?? UserAuthEmailMother.create(),
            password ?? UserAuthPasswordMother.create(),
            dateAdd ?? UserAuthDateAddMother.create(),
            dateUpd ?? UserAuthDateUpdMother.create(),
        );
    }
}
