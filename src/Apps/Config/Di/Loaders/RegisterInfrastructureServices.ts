import { MongoClient } from 'mongodb';

import { env } from '../../env';
import { CoreMongoDbClient } from '../../MongoDbConfig';
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
