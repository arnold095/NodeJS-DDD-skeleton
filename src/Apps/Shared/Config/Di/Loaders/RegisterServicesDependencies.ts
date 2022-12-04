import { Container, DependencyScope } from '../Container';
import { MongoClient } from 'mongodb';
import { SessionMongoDbClient } from '../../MongoDbConfig';
import { env } from '../../env';

export const registerServicesDependencies = (container: Container): void => {
  // Mongo
  container.registerFactoryAs(
    () => {
      return new MongoClient(env.mongo.mongoUri, {
        loggerLevel: 'debug',
      });
    },
    SessionMongoDbClient,
    DependencyScope.Singleton,
  );
};
