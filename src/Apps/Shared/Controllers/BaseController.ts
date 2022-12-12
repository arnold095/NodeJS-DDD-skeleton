/* eslint-disable @typescript-eslint/ban-types */
import { FastifyReply, FastifyRequest } from 'fastify';

import { Nullable } from '../../../Contexts/Shared/Domain';
import { isController } from '../../../Contexts/Shared/Infrastructure';

@isController()
export abstract class BaseController<RequestBody = {}, RequestParams = {}> {
  protected request!: FastifyRequest;
  protected response!: FastifyReply;

  protected abstract execute(): Promise<void>;

  protected params(): RequestParams {
    return this.request.params as RequestParams;
  }

  protected body(): RequestBody {
    return this.request.body as RequestBody;
  }

  protected sendOk(): void {
    void this.response.code(204).send();
  }

  protected sendResponse(params: unknown, statusCode?: number): void {
    void this.response.status(statusCode || 200).send(params);
  }

  protected userId(): Nullable<string> {
    return this.request.userId;
  }

  public async register(request: FastifyRequest, response: FastifyReply): Promise<void> {
    this.request = request;
    this.response = response;

    await this.execute();
  }
}
