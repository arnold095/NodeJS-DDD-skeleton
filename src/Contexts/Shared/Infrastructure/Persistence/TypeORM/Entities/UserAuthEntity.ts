import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { PrimaryColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO";
import { UserAuthId } from "@/Contexts/Auth/Domain/ValueObject/UserAuthId";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { UserAuthFirstName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthLastName";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";
import { UserAuthPassword } from "@/Contexts/Auth/Domain/ValueObject/UserAuthPassword";
import { UserAuthDateAdd } from "@/Contexts/Auth/Domain/ValueObject/UserAuthDateAdd";
import { UserAuthDateUpd } from "@/Contexts/Auth/Domain/ValueObject/UserAuthDateUpd";
import { EntityTransformer } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer";
import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { Entity } from "typeorm";

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
