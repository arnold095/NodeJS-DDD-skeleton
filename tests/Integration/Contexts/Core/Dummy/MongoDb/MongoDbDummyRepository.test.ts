import { container } from '../../../../../../src/Apps/Shared/Config/Di/DiConfig';
import { SessionMongoDbClient } from '../../../../../../src/Apps/Shared/Config/MongoDbConfig';
import { MongoDbDummyRepository } from '../../../../../../src/Contexts/Core/Dummy/Infrastructure/MongoDbDummyRepository';
import {
  connectMongoDb,
  disconnectMongoDb,
  loadMongoDb,
} from '../../../../../Utils/MongoDbLoader';
import { dummyRepositoryTests } from '../DummyRepositoryTests';

loadMongoDb();

beforeEach(async () => {
  await connectMongoDb();
});

afterEach(async () => {
  await disconnectMongoDb();
});

dummyRepositoryTests(new MongoDbDummyRepository(container.get(SessionMongoDbClient)));
