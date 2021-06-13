import { UserAuthId } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId';
import { UserAuthFirstName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName';
import { UserAuthLastName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';
type UserPrimitives = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

export class AuthorizationUser {
  public constructor(
    private id: UserAuthId,
    private name: UserAuthFirstName,
    private lastName: UserAuthLastName,
    private email: UserAuthEmail
  ) {}

  public static create(
    id: UserAuthId,
    name: UserAuthFirstName,
    lastName: UserAuthLastName,
    email: UserAuthEmail
  ): AuthorizationUser {
    return new AuthorizationUser(id, name, lastName, email);
  }

  public toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      lastName: this.lastName.value,
      email: this.email.value,
    };
  }
}
