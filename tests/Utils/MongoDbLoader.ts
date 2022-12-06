import { MongoClient } from 'mongodb';

import { DependencyScope } from '../../src/Apps/Shared/Config/Di/Container';
import { container } from '../../src/Apps/Shared/Config/Di/DiConfig';
import { env } from '../../src/Apps/Shared/Config/env';
import { SessionMongoDbClient } from '../../src/Apps/Shared/Config/MongoDbConfig';

export const loadMongoDb = (): void => {
  container.registerFactoryAs(
    () => {
      return new MongoClient(env.mongo.mongoUri, {
        loggerLevel: 'debug',
      });
    },
    SessionMongoDbClient,
    DependencyScope.Singleton,
  );

  container.build();
};

export const connectMongoDb = async (): Promise<MongoClient> => {
  const mongoClient = container.get(SessionMongoDbClient);
  await mongoClient.connect();
  return mongoClient;
};

const cleanMongoDb = async (mongoClient: SessionMongoDbClient): Promise<void> => {
  const collections = await mongoClient.db().collections();
  await Promise.all(collections.map(collection => collection.deleteMany({})));
};

export const disconnectMongoDb = async (): Promise<void> => {
  const mongoClient = container.get(SessionMongoDbClient);
  await cleanMongoDb(mongoClient);
  await mongoClient.close();
};
