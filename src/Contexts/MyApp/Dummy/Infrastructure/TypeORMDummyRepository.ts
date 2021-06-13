import { EntityRepository } from 'typeorm';
import { injectable } from 'inversify';
import { Dummy, DummyRepository, DummyId } from '@dummy';
import { DummyEntity, TypeORMClient } from '@sharedInfra';

@EntityRepository(Dummy)
@injectable()
export class TypeORMDummyRepository extends TypeORMClient implements DummyRepository {
  public async find(id: DummyId): Promise<Dummy> {
    let dummy;
    const repository = await this.repository(DummyEntity);
    const entity = await repository.findOne(id.value);
    if (entity) {
      dummy = entity.toDomainModel();
    }
    return dummy;
  }

  public async save(dummy: Dummy): Promise<void> {
    const repository = await this.repository(DummyEntity);
    const entity = DummyEntity.fromDomainClass(dummy);
    await repository.save(entity);
  }
}
