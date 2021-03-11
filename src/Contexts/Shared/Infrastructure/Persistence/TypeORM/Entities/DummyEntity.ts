import { Entity, PrimaryColumn } from "typeorm";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { DummyEmail } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";
import { DummyContent } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyTitle } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { EntityTransformer } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityTransformer";

@Entity('dummy')
export class DummyEntity implements PersistenceEntity {
    @PrimaryColumn({
        name: 'id_dummy', type: 'uuid',
        transformer: {
            from: value => new DummyId(value),
            to: value => value
        }
    })
    private _id;

    @ColumnVO('email', DummyEmail)
    private _email;

    @ColumnVO('title', DummyTitle)
    private _title;

    @ColumnVO('content', DummyContent)
    private _content;

    public toDomainModel(): DomainModel {
        return EntityTransformer.toDomainModel(this, Dummy);
    }

    public static fromDomainClass(dummy: Dummy): PersistenceEntity {
        return EntityTransformer.toEntity(dummy, DummyEntity);
    }
}
