import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";

// TODO:: Check class-transformer library.
export class EntityTransformer {
    static toDomainModel(entity: PersistenceEntity, domain): DomainModel {
        return Object.assign(new domain, entity);
    }

    static toEntity(model: DomainModel, entity):PersistenceEntity {
        let transformedEntity: PersistenceEntity = new entity();
        Object.keys(model).map(property => {
            if(model[property] && model[property].value){
                transformedEntity[property] = model[property].value;
            }
        });
        return transformedEntity;
    }
}
