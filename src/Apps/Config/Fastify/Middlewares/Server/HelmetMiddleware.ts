import fastifyHelmet from '@fastify/helmet';
import { type FastifyInstance } from 'fastify';

export const HelmetMiddleware = (server: FastifyInstance): void => {
  server.register(fastifyHelmet, {
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
    hsts: {
      includeSubDomains: true,
      maxAge: 31536000,
      preload: true,
    },
    frameguard: {
      action: 'deny',
    },
    hidePoweredBy: true,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none',
    },
    referrerPolicy: {
      policy: 'no-referrer',
    },
    noSniff: true,
  });
};
