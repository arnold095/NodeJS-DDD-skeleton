import { Entity, OneToMany } from 'typeorm';
import { PersistenceEntity } from '@/src/Contexts/Shared/Domain/Persistence/PersistenceEntity';
import { DummyId } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId';
import { DummyEmail } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail';
import { DummyTitle } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle';
import { DummyContent } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent';
import { DummyAddressEntity } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyAddressEntity';
import { PrimaryColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO';
import { ColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO';
import { DomainModel } from '@/src/Contexts/Shared/Domain/Model/DomainModel';
import { EntityTransformer } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer';
import { Dummy } from '@/src/Contexts/MyApp/Dummy/Domain/Dummy';
import { DummyAddress } from '@/src/Contexts/MyApp/DummyAddress/Domain/DummyAddress';

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
