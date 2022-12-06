import { FastifyReply, FastifyRequest } from 'fastify';
import { HookHandlerDoneFunction } from 'fastify/types/hooks';

export enum AllowedHttpMethods {
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
  target: unknown;
}

export const controllers: ControllerProps[] = [];

export const IsController = (props?: ControllerArgs): ClassDecorator => {
  return <TFunction>(target: TFunction): TFunction => {
    if (props) {
      controllers.push({ ...props, target });
    }
    return target;
  };
};
