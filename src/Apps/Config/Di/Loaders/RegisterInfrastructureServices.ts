import { MongoClient } from 'mongodb';

import { CoreMongoDbClient } from '../../MongoDbConfig';
import { env } from '../../env';
import { Container } from '../DiContainer';

export const registerInfrastructureServices = (container: Container): void => {
  // Mongo
  container
    .register(CoreMongoDbClient)
    .useFactory(() => {
      return new MongoClient(env.mongo.mongoUri, {});
    })
    .asSingleton();
};
