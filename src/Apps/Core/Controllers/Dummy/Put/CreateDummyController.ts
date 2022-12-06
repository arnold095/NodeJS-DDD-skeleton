import { CreateDummy } from '../../../../../Contexts/Core/Dummy/Application/UseCases/CreateDummy';
import { isController } from '../../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { BaseController } from '../../../../Shared/Controllers/BaseController';

type CreateDummyRequest = {
  name: string;
};

@isController({
  method: 'PUT',
  path: '/dummies/:id',
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
