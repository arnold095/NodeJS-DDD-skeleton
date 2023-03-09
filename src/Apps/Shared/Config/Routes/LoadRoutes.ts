import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { RouteHandlerMethod } from 'fastify/types/route';

import { Class } from '../../../../Contexts/Shared/Domain';
import { ControllerArgs, controllers } from '../../../../Contexts/Shared/Infrastructure';
import { BaseController } from '../../Controllers/BaseController';
import { container } from '../Di/DiContainer';

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

  server.route({
    method: args.method,
    url: args.path,
    handler: controllerHandler,
    preHandler: [...middlewares],
    schema: args?.schema,
  });
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
