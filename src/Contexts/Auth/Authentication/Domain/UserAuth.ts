import { UserAuthId } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId';
import { AggregateRoot } from '@/src/Contexts/Shared/Domain/Aggregate/AggregateRoot';
import { UserAuthFirstName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName';
import { UserAuthLastName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';
import { UserAuthPassword } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthPassword';
import { UserAuthDateAdd } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateAdd';
import { UserAuthDateUpd } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateUpd';
import { DateValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/DateValueObject';
import { UserRegisteredDomainEvent } from '@/src/Contexts/Auth/Authentication/Domain/UserRegisteredDomainEvent';

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
