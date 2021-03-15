import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";

// TODO:: Check class-transformer library.
export class EntityTransformer {

    static toDomainModels(entities: PersistenceEntity[], domain): DomainModel[] {
        const domainModels: DomainModel[] = [];
        for ( const entity of entities ) {
            domainModels.push(this.toDomainModel(entity, domain));
        }
        return domainModels;
    }

    static toDomainModel(entity: PersistenceEntity, domain): DomainModel {
        return Object.assign(new domain, entity);
    }

    static toEntities(domainModels: DomainModel[], entity) {
        const entities: PersistenceEntity[] = [];
        for ( const domainModel of domainModels ) {
            entities.push(this.toEntity(domainModel, entity));
        }
        return entities;
    }

    static toEntity(model: DomainModel, entity) {
        const transformedEntity = new entity();
        Object.keys(model).map(property => {
            if (model[property] && model[property].value) {
                transformedEntity[property] = model[property];
            }
        });
        return transformedEntity;
    }
}
