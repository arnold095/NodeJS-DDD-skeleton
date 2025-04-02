import 'reflect-metadata';
import { isService } from '../Contexts/Shared/Domain';
import { Logger } from '../Contexts/Shared/Domain/Services/Logger';
import { container } from './Config/Di/DiContainer';
import { loadContainer } from './Config/Di/Loaders';
import { loadFastifyServer } from './Config/Fastify/FastifyServer';
import { loadMongoDb } from './Config/MongoDbConfig';
import { env } from './Config/env';

@isService()
export class App {
  public async start(): Promise<void> {
    await loadContainer();
    const logger = container.get(Logger);

    try {
      await Promise.all([loadMongoDb()]);

      const server = await loadFastifyServer();

      server.listen({ port: env.app.port }, (err, address) => {
        if (err) {
          throw err;
        }
        logger.info(`Server listening on ${address} \n`);
        logger.info(server.printRoutes());
      });
    } catch (error) {
      logger.error(error as Error);

      process.exit(1);
    }
  }
}

(async (): Promise<void> => {
  try {
    const app = new App();

    await app.start();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
})();
