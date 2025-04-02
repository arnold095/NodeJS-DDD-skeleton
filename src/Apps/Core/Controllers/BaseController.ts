import type { FastifyReply, FastifyRequest } from 'fastify';

import { isController } from '../../../Contexts/Shared/Infrastructure';

enum HttpCodeResponseEnum {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

@isController()
export abstract class BaseController<
  RequestParams = Record<string, unknown>,
  RequestBody = Record<string, unknown>,
  RequestQuery = Record<string, unknown>,
> {
  protected request!: FastifyRequest;
  protected response!: FastifyReply;

  protected abstract execute(): Promise<void>;

  protected params(): RequestParams {
    return (this.request.params ?? {}) as RequestParams;
  }

  protected body(): RequestBody {
    return (this.request.body ?? {}) as RequestBody;
  }

  protected queryParams(): RequestQuery {
    return (this.request.query ?? {}) as RequestQuery;
  }

  protected async sendOk(): Promise<void> {
    await this.response.code(HttpCodeResponseEnum.OK).send();
  }

  protected async sendCreated(): Promise<void> {
    await this.response.code(HttpCodeResponseEnum.CREATED).send();
  }

  protected async sendNoContent(): Promise<void> {
    await this.response.code(HttpCodeResponseEnum.NO_CONTENT).send();
  }

  protected sendResponse(params: unknown, statusCode?: number): void {
    void this.response.status(statusCode || HttpCodeResponseEnum.OK).send(params);
  }

  public async register(request: FastifyRequest, response: FastifyReply): Promise<void> {
    this.request = request;
    this.response = response;

    await this.execute();
  }
}
