import { Entity, PrimaryColumn } from "typeorm";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";
import { DummyEmail } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";
import { DummyContent } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyTitle } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { ColumnVO } from "@/Contexts/Shared/Infrastructure/Decorators/ColumnVO";

@Entity('dummy')
export class DummyEntity implements PersistenceEntity {
    @PrimaryColumn({
        name: 'id_dummy', type: 'uuid',
        transformer: {
            from: value => new DummyId(value),
            to: value => value
        }
    })
    id;

    @ColumnVO('email', DummyEmail)
    email;

    @ColumnVO('title', DummyTitle)
    title;

    @ColumnVO('content', DummyContent)
    content;

    public toDomainClass(): Dummy {
        return new Dummy(this.id, this.title, this.content, this.email);
    }

    public static fromDomainClass(dummy: Dummy): DummyEntity {
        const entity = new DummyEntity();
        entity.id = dummy.id.value;
        entity.title = dummy.title.value;
        entity.content = dummy.content.value;
        entity.email = dummy.email.value;
        return entity;
    }
}
