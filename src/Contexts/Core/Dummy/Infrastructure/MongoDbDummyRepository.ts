import { isRepository } from '../../../Shared/Domain/Decorators/RepositoryDecorator';
import { Nullable } from '../../../Shared/Domain/Utils/Nullable';
import { MongoDbRepository } from '../../../Shared/Infrastructure/Persistence/MongoDb/MongoDbRepository';
import { Dummy } from '../Domain/Dummy';
import { DummyId } from '../Domain/DummyId';
import { DummyRepository } from '../Domain/DummyRepository';
import { DummySchema } from './DummySchema';
import { MongoDbDummyMapper } from './MongoDbDummyMapper';

@isRepository({
  abstraction: DummyRepository,
})
export class MongoDbDummyRepository
  extends MongoDbRepository<DummySchema>
  implements DummyRepository
{
  protected collectionName(): string {
    return 'Dummies';
  }

  public async find(id: DummyId): Promise<Nullable<Dummy>> {
    let dummy;

    const foundDummy = await this.searchOne({ _id: id.value });

    if (foundDummy) {
      dummy = MongoDbDummyMapper.toDomainModel(foundDummy);
    }

    return dummy;
  }

  public async save(dummy: Dummy): Promise<void> {
    await this.upsert({ _id: dummy.id.value }, MongoDbDummyMapper.toMongoDbModel(dummy));
  }
}
