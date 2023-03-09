import 'reflect-metadata';

import { FastifyInstance } from 'fastify';

import { fastifyServer } from '../../src/Apps/FastifyServer';
import { container } from '../../src/Apps/Shared/Config/Di/DiContainer';
import { env } from '../../src/Apps/Shared/Config/env';
import { SessionMongoDbClient } from '../../src/Apps/Shared/Config/MongoDbConfig';

export class App {
  public server!: FastifyInstance;

  public async start(): Promise<void> {
    this.server = await fastifyServer();
    try {
      const result = await this.server.listen({ port: env.app.port });
      // eslint-disable-next-line no-console
      console.info(`Server listening on ${result}`);
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    // eslint-disable-next-line no-console
    console.info('Stopping server...');
    const mongoClient = container.get(SessionMongoDbClient);

    const collections = await mongoClient.db().collections();
    await Promise.all(collections.map(collection => collection.drop()));

    await mongoClient.close();

    await this.server.close();
    // eslint-disable-next-line no-console
    console.info('Server stopped');
  }
}
