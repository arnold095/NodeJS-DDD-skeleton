import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";

export class EntityToDomain {
    static run(entity: PersistenceEntity, domain): DomainModel {
        return Object.assign(new domain, entity);
    }
}
