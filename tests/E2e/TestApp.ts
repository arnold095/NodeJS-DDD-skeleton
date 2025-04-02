import 'reflect-metadata';

import type { Server } from 'node:http';

import { container } from '../../src/Apps/Config/Di/DiContainer';
import { loadContainer } from '../../src/Apps/Config/Di/Loaders';
import { loadFastifyServer } from '../../src/Apps/Config/Fastify/FastifyServer';
import { CoreMongoDbClient, loadMongoDb } from '../../src/Apps/Config/MongoDbConfig';
import { env } from '../../src/Apps/Config/env';
import { Logger } from '../../src/Contexts/Shared/Domain/Services/Logger';

export class TestApp {
  public static httpServer: Server;

  public static async start(): Promise<void> {
    await loadContainer();
    const logger = container.get(Logger);

    try {
      await Promise.all([loadMongoDb()]);

      const server = await loadFastifyServer();

      await server.listen({ port: env.app.port });

      TestApp.httpServer = server.server;
    } catch (error) {
      logger.error(error as Error);

      process.exit(1);
    }
  }

  public static async stop(): Promise<void> {
    await Promise.all([this.stopMongoDb()]);

    this.httpServer.closeAllConnections();
  }

  private static async stopMongoDb(): Promise<void> {
    const coreMongoClient = container.get(CoreMongoDbClient);

    await Promise.all([coreMongoClient.db().dropDatabase()]);

    await Promise.all([coreMongoClient.close()]);
  }
}
