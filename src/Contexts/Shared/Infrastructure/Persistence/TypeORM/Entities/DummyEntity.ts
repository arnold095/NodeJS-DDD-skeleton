import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { DummyEmail } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";
import { DummyContent } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyTitle } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { EntityTransformer } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer";
import { DummyAddressEntity } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyAddressEntity";
import { DummyAddress } from "@/Contexts/MyApp/DummyAddress/Domain/DummyAddress";
import { PrimaryColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/PrimaryColumnVO";

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

    @OneToMany(type => DummyAddressEntity, address => address.dummy, {
        eager: true,
        cascade: ['insert', "update"]
    })
    public _addresses;

    public toDomainModel(): DomainModel {
        this._addresses = EntityTransformer.toDomainModels(this._addresses, DummyAddress);
        return EntityTransformer.toDomainModel(this, Dummy);
    }

    public static fromDomainClass(dummy: Dummy): PersistenceEntity {
        const addresses = EntityTransformer.toEntities(dummy.addresses, DummyAddressEntity);
        const dummyEntity = EntityTransformer.toEntity(dummy, DummyEntity);
        dummyEntity._addresses = addresses;
        return dummyEntity;
    }
}
