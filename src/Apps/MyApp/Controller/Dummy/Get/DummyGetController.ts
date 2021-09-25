import { Context, Response } from 'koa';
import { controller, httpGet } from 'decorator-koa-router';
import { KoaBaseController } from '@sharedInfra';
import { DummyFinder } from '@dummy';

@controller('/dummy')
export class DummyGetController extends KoaBaseController {
  public constructor(private readonly finder: DummyFinder) {
    super();
  }

  @httpGet('/:id')
  public async run({ params, response }: Context): Promise<Response> {
    const { id } = params;
    const dummy = await this.finder.run(id); // TODO: DTO Response
    return this.ok(dummy, response);
  }
}
