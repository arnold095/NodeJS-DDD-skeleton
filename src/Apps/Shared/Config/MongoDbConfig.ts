import { MongoClient } from 'mongodb';

import { container } from './Di/DiContainer';

export abstract class SessionMongoDbClient extends MongoClient {}

export const connectToSessionMongoDb = async (): Promise<void> => {
  const client = container.get(SessionMongoDbClient);

  try {
    await client.connect();
    // eslint-disable-next-line no-console
    console.info('[MONGODB_SESSION_CONNECTED]');
  } catch (error) {
    console.error(
      '[MONGODB_SESSION_CONNECTION_ERROR] Please make sure that Mongodb for sessions is running.',
    );
    console.error(error);

    throw error;
  }
};
