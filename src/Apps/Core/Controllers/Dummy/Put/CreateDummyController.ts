import { CreateDummy } from '../../../../../Contexts/Core/Dummy/Application/UseCases/CreateDummy';
import { isController } from '../../../../../Contexts/Shared/Infrastructure';
import { BaseController } from '../../../../Shared';
import { CreateDummySchema } from '../Schemas/CreateDummySchema';

type CreateDummyRequest = {
  name: string;
};

type Params = { id: string };

@isController({
  method: 'PUT',
  path: '/dummies/:id',
  schema: CreateDummySchema,
})
export class CreateDummyController extends BaseController<CreateDummyRequest, Params> {
  public constructor(private readonly useCase: CreateDummy) {
    super();
  }
  public async execute(): Promise<void> {
    const { id } = this.params();
    const request = this.body();

    await this.useCase.execute({ ...request, id });

    this.sendOk();
  }
}
