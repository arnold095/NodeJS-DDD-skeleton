import { FastifyRequest as OriginalFastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest extends OriginalFastifyRequest {
    userId?: string;
  }
}
