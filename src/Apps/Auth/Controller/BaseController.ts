import { injectable } from 'inversify';
import { Response } from 'koa';

@injectable()
export abstract class BaseController {
  private OK = 200;
  private CREATED = 201;
  private ACCEPTED = 202;

  protected ok(bodyResponse: unknown, res: Response): Response {
    res.status = this.OK;
    res.body = bodyResponse;
    return res;
  }

  protected created(bodyResponse: unknown, res: Response): Response {
    res.status = this.CREATED;
    res.body = bodyResponse;
    return res;
  }

  protected accepted(res: Response): Response {
    res.status = this.ACCEPTED;
    return res;
  }
}
