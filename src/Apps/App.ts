import 'reflect-metadata';
import * as map from 'source-map-support';
import { env } from './Shared/Config/env';
import { fastifyServer } from './FastifyServer';

map.install();

const start = async (): Promise<void> => {
  const server = await fastifyServer();
  try {
    server.listen({ port: env.app.port }, (err, address) => {
      if (err) {
        throw err;
      }
      console.info(`Server listening on ${address} \n`, server.printRoutes());
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
