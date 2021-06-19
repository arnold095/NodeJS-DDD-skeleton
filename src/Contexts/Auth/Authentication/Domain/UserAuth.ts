import { AggregateRoot, DateValueObject } from '@sharedDomain';
import {
  UserRegisteredDomainEvent,
  UserAuthId,
  UserAuthFirstName,
  UserAuthLastName,
  UserAuthEmail,
  UserAuthPassword,
  UserAuthDateAdd,
  UserAuthDateUpd,
  InvalidCredentials,
} from '@authentication';

export class UserAuth extends AggregateRoot {
  public constructor(
    private _id: UserAuthId,
    private _firstName: UserAuthFirstName,
    private _lastName: UserAuthLastName,
    private _email: UserAuthEmail,
    private _password: UserAuthPassword,
    private _dateAdd: UserAuthDateAdd,
    private _dateUpd: UserAuthDateUpd
  ) {
    super();
  }

  public static register(
    id: UserAuthId,
    firstName: UserAuthFirstName,
    lastName: UserAuthLastName,
    email: UserAuthEmail,
    password: UserAuthPassword
  ): UserAuth {
    const date = DateValueObject.currentDate();
    const dateAdd = new UserAuthDateAdd(date.value);
    const dateUpd = new UserAuthDateUpd(date.value);
    const user = new UserAuth(id, firstName, lastName, email, password, dateAdd, dateUpd);
    user.record(
      new UserRegisteredDomainEvent(
        user.id.value,
        user.firstName.value,
        user.lastName.value,
        user.email.value,
        user.password.value,
        user.dateAdd.value,
        user.dateUpd.value
      )
    );
    return user;
  }

  public async isValidPassword(otherPassword: string): Promise<void> {
    const passwordComparison = await this.password.isEquals(otherPassword);
    if (!passwordComparison) {
      throw new InvalidCredentials();
    }
  }

  get id(): UserAuthId {
    return this._id;
  }

  get firstName(): UserAuthFirstName {
    return this._firstName;
  }

  get lastName(): UserAuthLastName {
    return this._lastName;
  }

  get email(): UserAuthEmail {
    return this._email;
  }

  get password(): UserAuthPassword {
    return this._password;
  }

  get dateAdd(): UserAuthDateAdd {
    return this._dateAdd;
  }

  get dateUpd(): UserAuthDateUpd {
    return this._dateUpd;
  }
}
