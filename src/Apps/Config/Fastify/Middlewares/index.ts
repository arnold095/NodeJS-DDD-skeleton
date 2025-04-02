import { type FastifyInstance } from 'fastify';

import { CorsMiddleware } from './Server/CorsMiddleware';
import { ErrorHandlerMiddleware } from './Server/ErrorHandlerMiddleware';
import { HelmetMiddleware } from './Server/HelmetMiddleware';

export const loadMiddlewares = (server: FastifyInstance): void => {
  CorsMiddleware(server);
  HelmetMiddleware(server);

  server.setErrorHandler(ErrorHandlerMiddleware);
};
