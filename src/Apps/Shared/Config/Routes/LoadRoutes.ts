import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { RouteHandlerMethod, RouteShorthandOptions } from 'fastify/types/route';

import { Class } from '../../../../Contexts/Shared/Domain/Utils/Class';
import {
  ControllerArgs,
  controllers,
} from '../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { BaseController } from '../../Controllers/BaseController';
import { container } from '../Di/DiConfig';

const loadHealthCheck = (server: FastifyInstance): void => {
  server.get('/health-check', (_request: FastifyRequest, response: FastifyReply) => {
    void response.send({ status: 'ok' });
  });
};

const loadRoutePath = (
  server: FastifyInstance,
  controllerHandler: RouteHandlerMethod,
  args: ControllerArgs,
): void => {
  const middlewares = args.middlewares || [];

  const options: RouteShorthandOptions = {
    preHandler: [...middlewares],
    schema: args?.schema,
  };

  switch (args.method) {
    case 'PUT':
      server.put(`${args.path}`, options, controllerHandler);
      break;
    case 'POST':
      server.post(`${args.path}`, options, controllerHandler);
      break;
    case 'GET':
      server.get(`${args.path}`, options, controllerHandler);
      break;
    case 'DELETE':
      server.delete(`${args.path}`, options, controllerHandler);
      break;
    case 'PATCH':
      server.patch(`${args.path}`, options, controllerHandler);
      break;
    default:
      throw new Error(`Unsupported Http method: ${args.method}`);
  }
};

const loadController =
  (controller: BaseController): RouteHandlerMethod =>
  async (request: FastifyRequest, response: FastifyReply) => {
    await controller.register.call(controller, request, response);
  };

const findRouteHandler = (target: Class<BaseController>): RouteHandlerMethod => {
  const controller = container.get<BaseController>(target);

  return loadController(controller);
};

export const loadRoutes = async (server: FastifyInstance): Promise<void> => {
  await server.register(
    (instance, _opts, next) => {
      for (const controller of controllers) {
        const { target, ...controllerArgs } = controller;

        const controllerHandler = findRouteHandler(target);

        loadRoutePath(instance, controllerHandler, controllerArgs);
      }
      loadHealthCheck(instance);
      next();
    },
    { prefix: '/api/v1' },
  );
};
