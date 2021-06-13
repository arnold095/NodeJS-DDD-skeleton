/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DomainModel } from '@/src/Contexts/Shared/Domain/Model/DomainModel';
import { PersistenceEntity } from '@/src/Contexts/Shared/Domain/Persistence/PersistenceEntity';

// TODO:: Check class-transformer library.
export class EntityTransformer {
  static toDomainModels(entities: PersistenceEntity[], domain): DomainModel[] {
    const domainModels: DomainModel[] = [];
    for (const entity of entities) {
      domainModels.push(this.toDomainModel(entity, domain));
    }
    return domainModels;
  }

  static toDomainModel(entity: PersistenceEntity, Domain): DomainModel {
    return Object.assign(new Domain(), entity);
  }

  static toEntities(domainModels: DomainModel[], entity) {
    const entities: PersistenceEntity[] = [];
    for (const domainModel of domainModels) {
      entities.push(this.toEntity(domainModel, entity));
    }
    return entities;
  }

  static toEntity(model: DomainModel, Entity) {
    const transformedEntity = new Entity();
    for (const property of Object.keys(model)) {
      if (model[property] && model[property].value) {
        transformedEntity[property] = model[property];
      }
    }
    return transformedEntity;
  }
}
