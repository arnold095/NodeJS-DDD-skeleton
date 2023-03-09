import { isDomainImplementation, Nullable } from '../../../Shared/Domain';
import { MongoDbRepository } from '../../../Shared/Infrastructure';
import { Dummy } from '../Domain/Dummy';
import { DummyId } from '../Domain/DummyId';
import { DummyRepository } from '../Domain/DummyRepository';
import { DummySchema } from './DummySchema';
import { MongoDbDummyMapper } from './MongoDbDummyMapper';

@isDomainImplementation(DummyRepository)
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
