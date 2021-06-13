import { Entity } from 'typeorm';
import { DomainModel, PersistenceEntity } from '@sharedDomain';
import {
  UserAuth,
  UserAuthDateAdd,
  UserAuthDateUpd,
  UserAuthEmail,
  UserAuthFirstName,
  UserAuthId,
  UserAuthLastName,
  UserAuthPassword,
} from '@authentication';
import { EntityTransformer } from '../EntityTransformer';
import { ColumnVO } from '../Decorators/ColumnVO';
import { PrimaryColumnVO } from '../Decorators/PrimaryColumnVO';

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
