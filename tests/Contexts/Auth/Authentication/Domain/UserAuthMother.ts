import { UserAuthIdMother } from './UserAuthIdMother';
import { UserAuthFirstNameMother } from './UserAuthFirstNameMother';
import { UserAuthLastNameMother } from './UserAuthLastNameMother';
import { UserAuthEmailMother } from './UserAuthEmailMother';
import { UserAuthPasswordMother } from './UserAuthPasswordMother';
import { UserAuthDateAddMother } from './UserAuthDateAddMother';
import { UserAuthDateUpdMother } from './UserAuthDateUpdMother';
import {
  UserAuth,
  UserAuthDateAdd,
  UserAuthDateUpd,
  UserAuthEmail,
  UserAuthFirstName,
  UserAuthId,
  UserAuthLastName,
  UserAuthPassword,
} from '../../../../../src/Contexts/Auth/Authentication';

type UserAuthMotherTypes = {
  id?: UserAuthId;
  firstName?: UserAuthFirstName;
  lastName?: UserAuthLastName;
  email?: UserAuthEmail;
  password?: UserAuthPassword;
  dateAdd?: UserAuthDateAdd;
  dateUpd?: UserAuthDateUpd;
};

export class UserAuthMother {
  public static create({
    id,
    firstName,
    lastName,
    email,
    password,
    dateAdd,
    dateUpd,
  }: UserAuthMotherTypes): UserAuth {
    return new UserAuth(
      id ?? UserAuthIdMother.create(),
      firstName ?? UserAuthFirstNameMother.create(),
      lastName ?? UserAuthLastNameMother.create(),
      email ?? UserAuthEmailMother.create(),
      password ?? UserAuthPasswordMother.create(),
      dateAdd ?? UserAuthDateAddMother.create(),
      dateUpd ?? UserAuthDateUpdMother.create()
    );
  }
}
