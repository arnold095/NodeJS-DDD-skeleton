import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { EntityTransformer } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer";
import { DummyAddress } from "@/Contexts/MyApp/DummyAddress/Domain/DummyAddress";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { DummyEntity } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyEntity";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DummyAddressAlias } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias";
import { DummyAddressCity } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity";
import { DummyAddressPostalCode } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode";
import { DummyAddressCountry } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCountry";
import { DummyAddressDateAdd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateAdd";
import { DummyAddressDateUpd } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressDateUpd";
import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { Transform } from "class-transformer";

@Entity('dummy_address')
export class DummyAddressEntity implements PersistenceEntity {

    @PrimaryColumn({
        name: 'id_dummy_address', type: 'uuid',
        transformer: {
            from: value => new DummyAddressId(value),
            to: value => value
        }
    })
    dummyAddressId;
    @ColumnVO('id_dummy', DummyId)
    dummyId;
    @ColumnVO('alias', DummyAddressAlias)
    alias;
    @ColumnVO('city', DummyAddressCity)
    city;
    @ColumnVO('postal_code', DummyAddressPostalCode)
    postalCode;
    @ColumnVO('country', DummyAddressCountry)
    country;
    @ColumnVO('date_add', DummyAddressDateAdd)
    dateAdd;
    @ColumnVO('date_upd', DummyAddressDateUpd)
    dateUpd;

    @ManyToOne(() => DummyEntity, dummy => dummy._addresses, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'id_dummy'})
    dummy: DummyEntity;

    public toDomainModel(): DomainModel {
        return EntityTransformer.toDomainModel(this, DummyAddress);
    }

    public static fromDomainClass(dummy: Dummy): PersistenceEntity {
        return EntityTransformer.toEntity(dummy, DummyAddressEntity);
    }
}
