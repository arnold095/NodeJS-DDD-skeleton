import { FastifyReply, FastifyRequest } from 'fastify';
import { HookHandlerDoneFunction } from 'fastify/types/hooks';

export type AllowedHttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

type ControllerMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => Promise<void> | void;

export interface ControllerArgs {
  method: AllowedHttpMethods;
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
