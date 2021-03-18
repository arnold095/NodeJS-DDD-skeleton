import { UserAuthId } from "@/Contexts/Auth/Domain/ValueObject/UserAuthId";
import { AggregateRoot } from "@/Contexts/Shared/Domain/Aggregate/AggregateRoot";
import { UserAuthFirstName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthLastName";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";
import { UserAuthPassword } from "@/Contexts/Auth/Domain/ValueObject/UserAuthPassword";
import { UserAuthDateAdd } from "@/Contexts/Auth/Domain/ValueObject/UserAuthDateAdd";
import { UserAuthDateUpd } from "@/Contexts/Auth/Domain/ValueObject/UserAuthDateUpd";
import { DateValueObject } from "@/Contexts/Shared/Domain/ValueObject/DateValueObject";

export class UserAuth extends AggregateRoot {
    public constructor(
        private _id: UserAuthId, private _firstName: UserAuthFirstName,
        private _lastName: UserAuthLastName, private _email: UserAuthEmail,
        private _password: UserAuthPassword, private _dateAdd: UserAuthDateAdd,
        private _dateUpd: UserAuthDateUpd
    ) {
        super();
    }

    public static register(id: UserAuthId, firstName: UserAuthFirstName,
                           lastName: UserAuthLastName, email: UserAuthEmail,
                           password: UserAuthPassword): UserAuth {
        const date = DateValueObject.currentDate();
        const dateAdd = new UserAuthDateAdd(date.value);
        const dateUpd = new UserAuthDateUpd(date.value);
        return new UserAuth(
            id, firstName, lastName,
            email, password, dateAdd, dateUpd);
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
