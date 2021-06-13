import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PersistenceEntity } from '@/src/Contexts/Shared/Domain/Persistence/PersistenceEntity';
import { DummyAddressId } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId';
import { ColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO';
import { DummyId } from '@/src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId';
import { DummyAddressAlias } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias';
import { DummyAddressCity } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity';
import { DummyAddressStreet } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressStreet';
import { DummyAddressPostalCode } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode';
import { DummyAddressCountry } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry';
import { DummyAddressDateAdd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd';
import { DummyAddressDateUpd } from '@/src/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd';
import { DummyEntity } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyEntity';
import { DummyAddress } from '@/src/Contexts/MyApp/DummyAddress/Domain/DummyAddress';
import { DomainModel } from '@/src/Contexts/Shared/Domain/Model/DomainModel';
import { EntityTransformer } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer';
import { Dummy } from '@/src/Contexts/MyApp/Dummy/Domain/Dummy';
import { PrimaryColumnVO } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO';

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
  dummy: DummyEntity;

  public toDomainModel(): DomainModel {
    return EntityTransformer.toDomainModel(this, DummyAddress);
  }

  public static fromDomainClass(dummy: Dummy): PersistenceEntity {
    return EntityTransformer.toEntity(dummy, DummyAddressEntity);
  }
}
