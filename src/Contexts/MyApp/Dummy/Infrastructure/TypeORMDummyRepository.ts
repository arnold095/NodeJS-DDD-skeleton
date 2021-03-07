import { DummyRepository } from "@/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";
import { TypeORMClient } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMClient";
import { DummyEntity } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyEntity";
import { EntityRepository } from "typeorm";
import { injectable } from "inversify";

@EntityRepository(Dummy)
@injectable()
export class TypeORMDummyRepository extends TypeORMClient implements DummyRepository {

    public async find(id: DummyId): Promise<Dummy> {
        let dummy: Dummy;
        const repository = await this.repository(DummyEntity);
        const entity = await repository.findOne(id.value);
        if (entity) {
            dummy = entity.toDomainClass();
        }
        return dummy;
    }

    public async save(dummy: Dummy): Promise<void> {
        const repository = await this.repository(DummyEntity);
        const entity = DummyEntity.fromDomainClass(dummy);
        await repository.save(entity);
    }

}
