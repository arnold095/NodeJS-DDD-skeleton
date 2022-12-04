import { IsRepository } from '../../../Shared/Domain/Decorators/RepositoryDecorator';
import { MongoDbRepository } from '../../../Shared/Infrastructure/Persistence/MongoDb/MongoDbRepository';
import { DummyRepository } from '../Domain/DummyRepository';
import { DummyId } from '../Domain/DummyId';
import { Nullable } from '../../../Shared/Domain/Utils/Nullable';
import { Dummy } from '../Domain/Dummy';
import { MongoDbDummyMapper } from './MongoDbDummyMapper';
import { DummySchema } from './DummySchema';

@IsRepository({
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
