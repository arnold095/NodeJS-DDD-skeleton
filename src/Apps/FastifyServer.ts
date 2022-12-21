import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastify, { FastifyInstance } from 'fastify';

import { connectToSessionMongoDb, env, loadContainer, loadRoutes } from './Shared';

const enableCors = async (server: FastifyInstance): Promise<void> => {
  await server.register(fastifyCors, {
    origin: env.app.allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true,
    preflightContinue: false,
  });
};

const addSecurityHeaders = async (server: FastifyInstance): Promise<void> => {
  await server.register(fastifyHelmet);
};

export const fastifyServer = async (): Promise<FastifyInstance> => {
  const server = fastify({ logger: true });

  await loadContainer();
  await loadRoutes(server);
  await enableCors(server);
  await addSecurityHeaders(server);
  await connectToSessionMongoDb();

  return server;
};
