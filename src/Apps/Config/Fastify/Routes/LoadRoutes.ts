import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  type RouteHandlerMethod,
} from 'fastify';

import { NewableClass } from '../../../../Contexts/Shared/Domain';
import { ControllerArgs, controllers } from '../../../../Contexts/Shared/Infrastructure';
import { BaseController } from '../../../Core/Controllers/BaseController';
import { container } from '../../Di/DiContainer';
import { env } from '../../env';

type ControllerClass = NewableClass<BaseController>;

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
  async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    await controller.register.call(controller, request, response);
  };

const findRouteHandler = (target: ControllerClass): RouteHandlerMethod => {
  const controller = container.get<BaseController>(target);

  return loadController(controller);
};

export const loadRoutes = (server: FastifyInstance): void => {
  server.register(
    (instance, _opts, next): void => {
      for (const controller of controllers) {
        const { target, ...controllerArgs } = controller;

        const controllerHandler = findRouteHandler(target);

        loadRoutePath(instance, controllerHandler, controllerArgs);
      }

      next();
    },
    { prefix: env.app.routePrefix },
  );
};
