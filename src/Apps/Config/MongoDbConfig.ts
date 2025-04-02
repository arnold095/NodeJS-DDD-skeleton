import { MongoClient } from 'mongodb';

import { Logger } from '../../Contexts/Shared/Domain/Services/Logger';
import { container } from './Di/DiContainer';

export abstract class CoreMongoDbClient extends MongoClient {}

export const loadMongoDb = async (): Promise<void> => {
  const logger = container.get(Logger);

  const client = container.get(CoreMongoDbClient);

  try {
    await client.connect();
    logger.info(`[MONGODB_CONNECTED] - Database: ${client.db().databaseName}`);
  } catch (error) {
    logger.error(error as Error);

    throw error;
  }
};
