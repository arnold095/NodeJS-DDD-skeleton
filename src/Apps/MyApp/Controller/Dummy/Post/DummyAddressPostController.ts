import { Context, Response } from 'koa';
import { controller, httpPost } from 'decorator-koa-router';
import { KoaBaseController, validateDto } from '@sharedInfra';
import { DummyAddressCreator, DummyAddressCreatorRequest } from '@dummy';
@controller('/dummy')
export class DummyAddressPostController extends KoaBaseController {
  public constructor(private readonly addressCreator: DummyAddressCreator) {
    super();
  }

  @httpPost('/address/', validateDto(DummyAddressCreatorRequest))
  public async run({ response, dtoBody }: Context): Promise<Response> {
    await this.addressCreator.run(dtoBody);
    return this.notContent(response);
  }
}
