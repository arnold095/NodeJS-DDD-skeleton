import { FastifyReply, FastifyRequest } from 'fastify';
import { HookHandlerDoneFunction } from 'fastify/types/hooks';
import { verify } from 'jsonwebtoken';

import { env } from '../Config/env';

const findTokenOrThrow = (request: FastifyRequest): string => {
  const token = request.headers.authorization?.split(' ').pop();

  if (!token) {
    throw new Error('The access token is required');
  }

  return token;
};

export const AuthMiddleWare = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
): void => {
  try {
    const token = findTokenOrThrow(request);

    request.userId = verify(token, env.jwt.privateKey) as string;
  } catch (err) {
    const error = err as Error;

    void reply.code(401).send({
      message: error.message,
    });
  } finally {
    done();
  }
};
