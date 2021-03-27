import { UserAuthId } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId";
import { UserAuthFirstName } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName";
import { UserAuthEmail } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail";

export class AuthorizationUser {
    public constructor(private id: UserAuthId, private name: UserAuthFirstName,
                       private lastName: UserAuthLastName, private email: UserAuthEmail
    ) {

    }

    public static create(id: UserAuthId, name: UserAuthFirstName,
                         lastName: UserAuthLastName, email: UserAuthEmail): AuthorizationUser {
        return new AuthorizationUser(
            id, name, lastName, email
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            lastName: this.lastName.value,
            email: this.email.value,
        }
    }
}
