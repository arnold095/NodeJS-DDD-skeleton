import { Entity, PrimaryColumn } from "typeorm";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { DummyEmail } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";
import { DummyContent } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyTitle } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Decorators/ColumnVO";
import { EntityToDomain } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/EntityToDomain";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";

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


    public toDomainClass(): DomainModel {
        return EntityToDomain.run(this, Dummy);
    }

    public static fromDomainClass(dummy: Dummy): DummyEntity {
        const entity = new DummyEntity();
        entity._id = dummy.id.value;
        entity._title = dummy.title.value;
        entity._content = dummy.content.value;
        entity._email = dummy.email.value;
        return entity;
    }
}
