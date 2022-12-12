import { FastifyReply, FastifyRequest } from 'fastify';
import { HookHandlerDoneFunction } from 'fastify/types/hooks';

import { type BaseController } from '../../../../Apps/Shared/Controllers/BaseController';
import { Class } from '../../Domain/Utils/Class';
import { NewableClass } from '../../Domain/Utils/NewableClass';

enum AllowedHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
}

type ControllerMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => Promise<void> | void;

export interface ControllerArgs {
  method: keyof typeof AllowedHttpMethods;
  path: string;
  middlewares?: ControllerMiddleware[];
  schema?: Record<string, unknown>;
}

interface ControllerProps extends ControllerArgs {
  target: NewableClass<BaseController>;
}

export const controllers: ControllerProps[] = [];

export const isController = (props?: ControllerArgs): Class<BaseController> => {
  return (target: Class<BaseController>): Class<BaseController> => {
    if (props) {
      controllers.push({ ...props, target: target as NewableClass<BaseController> });
    }

    return target;
  };
};
