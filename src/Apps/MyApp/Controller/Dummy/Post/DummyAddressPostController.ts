import { inject, injectable } from 'inversify';
import { Body, Controller, OnUndefined, Post } from 'routing-controllers';
import { DummyAddressCreator, DummyAddressCreatorRequest } from '@dummy';

@injectable()
@Controller('/dummy/address')
export class DummyAddressPostController {
  public constructor(
    @inject('DummyAddressCreator') private readonly addressCreator: DummyAddressCreator
  ) {}

  @Post('/save')
  @OnUndefined(202)
  public async run(@Body() request: DummyAddressCreatorRequest): Promise<void> {
    await this.addressCreator.run(request);
  }
}
