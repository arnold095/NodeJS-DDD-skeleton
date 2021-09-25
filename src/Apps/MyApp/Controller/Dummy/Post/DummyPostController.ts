import { controller, httpPost } from 'decorator-koa-router';
import { Context, Response } from 'koa';
import { KoaBaseController, validateDto } from '@sharedInfra';
import { DummyCreator, DummyCreatorRequest } from '@dummy';

@controller('/dummy')
export class DummyPostController extends KoaBaseController {
  constructor(private dummyCreator: DummyCreator) {
    super();
  }

  @httpPost('/', validateDto(DummyCreatorRequest))
  public async run({ response, dtoBody }: Context): Promise<Response> {
    await this.dummyCreator.run(dtoBody);
    return this.notContent(response);
  }
}
