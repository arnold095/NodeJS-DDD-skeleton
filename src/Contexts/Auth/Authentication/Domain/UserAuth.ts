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

export type UserAuthPrimitives = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateAdd: Date;
  dateUpd: Date;
};

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
        user.email.value
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

  public toPrimitives(): UserAuthPrimitives {
    return {
      id: this.id.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      dateAdd: this.dateAdd.value,
      dateUpd: this.dateUpd.value,
    };
  }

  public static fromPrimitives(primitives: UserAuthPrimitives): UserAuth {
    return new UserAuth(
      new UserAuthId(primitives.id),
      new UserAuthFirstName(primitives.firstName),
      new UserAuthLastName(primitives.lastName),
      new UserAuthEmail(primitives.email),
      new UserAuthPassword(primitives.password),
      new UserAuthDateAdd(primitives.dateAdd),
      new UserAuthDateUpd(primitives.dateUpd)
    );
  }
}
