import { PrimaryColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { Entity } from "typeorm";
import { EntityTransformer } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { UserAuthId } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId";
import { UserAuthFirstName } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName";
import { UserAuthEmail } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail";
import { UserAuthPassword } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthPassword";
import { UserAuthDateAdd } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateAdd";
import { UserAuthDateUpd } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateUpd";
import { UserAuth } from "@/Contexts/Auth/Authentication/Domain/UserAuth";

@Entity('user')
export class UserAuthEntity implements PersistenceEntity {
    @PrimaryColumnVO('id_user', UserAuthId)
    private _id;
    @ColumnVO('first_name', UserAuthFirstName)
    private _firstName;
    @ColumnVO('last_name', UserAuthLastName)
    private _lastName;
    @ColumnVO('email', UserAuthEmail)
    private _email;
    @ColumnVO('password', UserAuthPassword)
    private _password;
    @ColumnVO('date_add', UserAuthDateAdd)
    private _dateAdd;
    @ColumnVO('date_upd', UserAuthDateUpd)
    private _dateUpd;

    public toDomainModel(): DomainModel {
        return EntityTransformer.toDomainModel(this, UserAuth);
    }

    public static fromDomainClass(user: UserAuth): PersistenceEntity {
        return EntityTransformer.toEntity(user, UserAuthEntity);
    }

}
