import { Dummy } from '../Domain/Dummy';
import { DummyId } from '../Domain/DummyId';
import { DummyName } from '../Domain/DummyName';
import { DummySchema } from './DummySchema';

export class MongoDbDummyMapper {
  public static toDomainModel(schema: DummySchema): Dummy {
    return new Dummy({
      id: new DummyId(schema._id),
      name: new DummyName(schema.name),
    });
  }

  public static toMongoDbModel(dummy: Dummy): DummySchema {
    return {
      _id: dummy.id.value,
      name: dummy.name.value,
    };
  }
}
