import { PrimaryColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO';
import { ColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO';
import { Entity } from 'typeorm';
import { EntityTransformer } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer';
import { PersistenceEntity } from '@/src/Contexts/Shared/Domain/Persistence/PersistenceEntity';
import { DomainModel } from '@/src/Contexts/Shared/Domain/Model/DomainModel';
import { UserAuthId } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId';
import { UserAuthFirstName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName';
import { UserAuthLastName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';
import { UserAuthPassword } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthPassword';
import { UserAuthDateAdd } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateAdd';
import { UserAuthDateUpd } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthDateUpd';
import { UserAuth } from '@/src/Contexts/Auth/Authentication/Domain/UserAuth';

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
