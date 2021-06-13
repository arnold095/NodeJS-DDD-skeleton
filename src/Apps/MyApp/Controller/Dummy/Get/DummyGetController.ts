import { inject, injectable } from 'inversify';
import { Controller, Get, HttpCode, Param } from 'routing-controllers';
import { DummyFinderRequest } from '@/src/Contexts/MyApp/Dummy/Application/Find/DummyFinderRequest';
import { DummyFinder } from '@/src/Contexts/MyApp/Dummy/Application/Find/DummyFinder';

@Controller('/dummy')
@injectable()
export class DummyGetController {
  public constructor(@inject('DummyFinder') private readonly finder: DummyFinder) {}

  @Get('/:id')
  @HttpCode(200)
  public async run(@Param('id') id: string): Promise<unknown> {
    const request = new DummyFinderRequest(id);
    return await this.finder.run(request); // TODO: DTO Response
  }
}
