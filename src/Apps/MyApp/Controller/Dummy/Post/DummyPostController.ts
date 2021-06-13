import { inject, injectable } from 'inversify';
import { Body, Controller, OnUndefined, Post } from 'routing-controllers';
import { DummyCreator, DummyCreatorRequest } from '@dummy';

@injectable()
@Controller('/dummy')
export class DummyPostController {
  constructor(@inject('DummyCreator') private dummyCreator: DummyCreator) {}

  @Post('/save')
  @OnUndefined(202)
  public async run(@Body() request: DummyCreatorRequest): Promise<void> {
    await this.dummyCreator.run(request);
  }
}
