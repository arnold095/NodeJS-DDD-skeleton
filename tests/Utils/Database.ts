import { MongoClient } from 'mongodb';

import { container, SessionMongoDbClient } from '../../src/Apps/Shared';

export const connectMongoDb = async (): Promise<MongoClient> => {
  const mongoClient = container.get(SessionMongoDbClient);
  await mongoClient.connect();
  return mongoClient;
};

const cleanMongoDb = async (mongoClient: SessionMongoDbClient): Promise<void> => {
  await mongoClient.db().dropDatabase();
};

export const disconnectMongoDb = async (): Promise<void> => {
  const mongoClient = container.get(SessionMongoDbClient);
  await cleanMongoDb(mongoClient);
  await mongoClient.close();
};
