import { IsController } from '../../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { BaseController } from '../../../../Shared/Controllers/BaseController';
import { CreateDummy } from '../../../../../Contexts/Core/Dummy/Application/UseCases/CreateDummy';

type CreateDummyRequest = {
  name: string;
};

@IsController({
  method: 'PUT',
  path: '/dummy/:id/create',
})
export class CreateDummyController extends BaseController {
  public constructor(private readonly useCase: CreateDummy) {
    super();
  }
  public async execute(): Promise<void> {
    const { id } = this.params<{ id: string }>();
    const request = this.body<CreateDummyRequest>();

    await this.useCase.execute({ ...request, id });
    this.sendOk();
  }
}
