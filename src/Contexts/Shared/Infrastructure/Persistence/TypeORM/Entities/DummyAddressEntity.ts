import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DomainModel, PersistenceEntity } from '@sharedDomain';
import {
  DummyAddress,
  DummyAddressAlias,
  DummyAddressCity,
  DummyAddressCountry,
  DummyAddressDateAdd,
  DummyAddressDateUpd,
  DummyAddressId,
  DummyAddressPostalCode,
  DummyAddressStreet,
} from '@dummyAddress';
import { PrimaryColumnVO } from '../Decorators/PrimaryColumnVO';
import { Dummy, DummyId } from '@dummy';
import { ColumnVO } from '../Decorators/ColumnVO';
import { DummyEntity } from './DummyEntity';
import { EntityTransformer } from '../EntityTransformer';

@Entity('dummy_address')
export class DummyAddressEntity implements PersistenceEntity {
  @PrimaryColumnVO('id_dummy_address', DummyAddressId)
  _id;

  @ColumnVO('id_dummy', DummyId)
  _dummyId;

  @ColumnVO('alias', DummyAddressAlias)
  _alias;

  @ColumnVO('city', DummyAddressCity)
  _city;

  @ColumnVO('street', DummyAddressStreet)
  _street;

  @ColumnVO('postal_code', DummyAddressPostalCode)
  _postalCode;

  @ColumnVO('country', DummyAddressCountry)
  _country;

  @ColumnVO('date_add', DummyAddressDateAdd)
  _dateAdd;

  @ColumnVO('date_upd', DummyAddressDateUpd)
  _dateUpd;

  @ManyToOne(() => DummyEntity, (dummy) => dummy._addresses, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id_dummy' })
  dummy!: DummyEntity;

  public toDomainModel(): DomainModel {
    return EntityTransformer.toDomainModel(this, DummyAddress);
  }

  public static fromDomainClass(dummy: Dummy): PersistenceEntity {
    return EntityTransformer.toEntity(dummy, DummyAddressEntity);
  }
}
