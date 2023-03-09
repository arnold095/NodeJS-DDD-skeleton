import { MongoClient } from 'mongodb';

import { env } from '../../env';
import { SessionMongoDbClient } from '../../MongoDbConfig';
import { Container } from '../DiContainer';

export const registerInfrastructureServices = (container: Container): void => {
  // Mongo
  container
    .register(SessionMongoDbClient)
    .useFactory(() => {
      return new MongoClient(env.mongo.mongoUri, {
        loggerLevel: 'debug',
      });
    })
    .asSingleton();
};
