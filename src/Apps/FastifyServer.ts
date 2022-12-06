import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import { loadContainer } from './Shared/Config/Di/Loaders';
import { connectToSessionMongoDb } from './Shared/Config/MongoDbConfig';
import { LoadRoutes } from './Shared/Config/Routes/LoadRoutes';

const enableCors = async (server: FastifyInstance): Promise<void> => {
  await server.register(fastifyCors, {
    origin: '*',
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
  await LoadRoutes(server);
  await enableCors(server);
  await addSecurityHeaders(server);
  await connectToSessionMongoDb();

  return server;
};
