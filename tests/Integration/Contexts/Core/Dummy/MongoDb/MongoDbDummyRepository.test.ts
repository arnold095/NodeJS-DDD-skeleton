import { container, SessionMongoDbClient } from '../../../../../../src/Apps/Shared';
import { MongoDbDummyRepository } from '../../../../../../src/Contexts/Core/Dummy/Infrastructure/MongoDbDummyRepository';
import { connectMongoDb, disconnectMongoDb } from '../../../../../Utils/Database';
import { registerInfrastructureDependencies } from '../../../../../Utils/Utils';
import { dummyRepositoryTests } from '../DummyRepositoryTests';

registerInfrastructureDependencies();
beforeEach(async () => {
  await connectMongoDb();
});

afterEach(async () => {
  await disconnectMongoDb();
});

dummyRepositoryTests(new MongoDbDummyRepository(container.get(SessionMongoDbClient)));
