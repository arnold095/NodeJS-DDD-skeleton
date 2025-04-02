import fastifyCors from '@fastify/cors';
import { type FastifyInstance } from 'fastify';

export const CorsMiddleware = (server: FastifyInstance): void => {
  server.register(fastifyCors, {
    origin: [/^http(s?):\/\/localhost(:\d+)?$/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true,
    preflightContinue: false,
    maxAge: 10 * 60,
    exposedHeaders: 'X-RateLimit-Reset',
  });
};
