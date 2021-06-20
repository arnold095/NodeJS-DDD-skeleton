import { UserRegisterRequest } from '../../../../../../src/Contexts/Auth/Authentication';
import { UserAuthIdMother } from '../../Domain/UserAuthIdMother';
import { UserAuthFirstNameMother } from '../../Domain/UserAuthFirstNameMother';
import { UserAuthLastNameMother } from '../../Domain/UserAuthLastNameMother';
import { UserAuthEmailMother } from '../../Domain/UserAuthEmailMother';
import { UserAuthPasswordMother } from '../../Domain/UserAuthPasswordMother';
import { plainToClass } from 'class-transformer';

type RegisterTypes = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export class UserRegisterRequestMother {
  public static create({
    id,
    email,
    firstName,
    lastName,
    password,
  }: RegisterTypes): UserRegisterRequest {
    return plainToClass(UserRegisterRequest, {
      id: id ?? UserAuthIdMother.create().value,
      firstName: firstName ?? UserAuthFirstNameMother.create().value,
      lastName: lastName ?? UserAuthLastNameMother.create().value,
      email: email ?? UserAuthEmailMother.create().value,
      password: password ?? UserAuthPasswordMother.create().value,
    });
  }
}
