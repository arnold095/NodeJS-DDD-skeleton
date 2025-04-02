import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';

import { loadMiddlewares } from './Middlewares';
import { loadRoutes } from './Routes/LoadRoutes';

export const loadFastifyServer = (
  serverProps: FastifyServerOptions = {
    logger: false,
  },
): Promise<FastifyInstance> => {
  const server = fastify({
    ...serverProps,
    ajv: {
      customOptions: {
        allErrors: true,
        strict: true,
        strictSchema: true,
        strictNumbers: true,
        strictTypes: true,
        strictTuples: true,
        strictRequired: true,
      },
    },
  });

  loadMiddlewares(server);
  loadRoutes(server);

  return Promise.resolve(server);
};
