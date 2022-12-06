import { FastifyReply, FastifyRequest } from 'fastify';

import { isController } from '../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';

@isController()
export abstract class BaseController {
  protected request!: FastifyRequest;
  protected response!: FastifyReply;

  protected abstract execute(): Promise<void>;

  protected params<T extends Record<string, unknown>>(): T {
    return this.request.params as T;
  }

  protected query<T extends Record<string, unknown>>(): T {
    return this.request.query as T;
  }

  protected body<T>(): T {
    return this.request.body as T;
  }

  protected sendOk(): void {
    void this.response.code(204).send();
  }

  protected sendResponse(params: unknown, statusCode?: number): void {
    void this.response.status(statusCode || 200).send(params);
  }

  protected userId(): string {
    return this.body<{ userId: string }>()?.userId;
  }

  protected async empty(): Promise<void> {
    await this.response.status(204).send();
  }

  public async register(request: FastifyRequest, response: FastifyReply): Promise<void> {
    this.request = request;
    this.response = response;

    await this.execute();
  }
}
