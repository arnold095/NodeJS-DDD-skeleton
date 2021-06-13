import { Entity, OneToMany } from 'typeorm';
import { DomainModel, PersistenceEntity } from '@sharedDomain';
import { Dummy, DummyContent, DummyEmail, DummyId, DummyTitle } from '@dummy';
import { PrimaryColumnVO } from '../Decorators/PrimaryColumnVO';
import { ColumnVO } from '../Decorators/ColumnVO';
import { DummyAddressEntity } from './DummyAddressEntity';
import { EntityTransformer } from '../EntityTransformer';
import { DummyAddress } from '@dummyAddress';

@Entity('dummy')
export class DummyEntity implements PersistenceEntity {
  @PrimaryColumnVO('id_dummy', DummyId)
  private _id;

  @ColumnVO('email', DummyEmail)
  private _email;

  @ColumnVO('title', DummyTitle)
  private _title;

  @ColumnVO('content', DummyContent)
  private _content;

  @OneToMany(() => DummyAddressEntity, (address) => address.dummy, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  public _addresses;

  public toDomainModel(): DomainModel {
    this._addresses = EntityTransformer.toDomainModels(this._addresses, DummyAddress);
    return EntityTransformer.toDomainModel(this, Dummy);
  }

  public static fromDomainClass(dummy: Dummy): PersistenceEntity {
    const dummyEntity = EntityTransformer.toEntity(dummy, DummyEntity);
    if (dummy.addresses) {
      dummyEntity._addresses = EntityTransformer.toEntities(
        dummy.addresses,
        DummyAddressEntity
      );
    }
    return dummyEntity;
  }
}
