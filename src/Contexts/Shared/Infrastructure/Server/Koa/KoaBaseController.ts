import { Response } from 'koa';

enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NOT_CONTENT = 204,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
}

export abstract class KoaBaseController {
  protected ok(bodyResponse: unknown, res: Response): Response {
    res.status = HTTP_CODES.OK;
    res.body = bodyResponse;
    return res;
  }

  protected created(bodyResponse: unknown, res: Response): Response {
    res.status = HTTP_CODES.CREATED;
    res.body = bodyResponse;
    return res;
  }

  protected accepted(res: Response): Response {
    res.status = HTTP_CODES.ACCEPTED;
    return res;
  }

  protected notContent(res: Response): Response {
    res.status = HTTP_CODES.NOT_CONTENT;
    return res;
  }

  protected badRequest(bodyResponse: unknown, res: Response): Response {
    res.status = HTTP_CODES.BAD_REQUEST;
    res.body = bodyResponse;
    return res;
  }

  protected forbidden(res: Response): Response {
    res.status = HTTP_CODES.FORBIDDEN;
    return res;
  }
}
