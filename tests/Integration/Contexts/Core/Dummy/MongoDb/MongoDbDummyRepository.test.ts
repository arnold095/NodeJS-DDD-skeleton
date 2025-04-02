import { MongoClient } from 'mongodb';

import { env } from '../../../../../../src/Apps/Config/env';
import { MongoDbDummyRepository } from '../../../../../../src/Contexts/Core/Dummy/Infrastructure/MongoDbDummyRepository';
import { dummyRepositoryTests } from '../DummyRepositoryTests';

const mongoClient = new MongoClient(env.mongo.mongoUri, {
  monitorCommands: true,
});

beforeAll(async (): Promise<void> => {
  await mongoClient.connect();
});

afterAll(async (): Promise<void> => {
  await mongoClient.db().dropDatabase();
  await mongoClient.close();
});

beforeEach(async (): Promise<void> => {
  await mongoClient.db().dropDatabase();
});

dummyRepositoryTests(new MongoDbDummyRepository(mongoClient));
