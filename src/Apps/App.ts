import 'reflect-metadata';

import * as map from 'source-map-support';

import { fastifyServer } from './FastifyServer';
import { env } from './Shared';

map.install();

const start = async (): Promise<void> => {
  const server = await fastifyServer();
  try {
    server.listen({ port: env.app.port }, (err, address) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.info(`Server listening on ${address} \n`, server.printRoutes());
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
