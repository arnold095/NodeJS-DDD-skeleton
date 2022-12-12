import { EventBus, isUseCase } from '../../../../Shared/Domain';
import { Dummy } from '../../Domain/Dummy';
import { DummyId } from '../../Domain/DummyId';
import { DummyName } from '../../Domain/DummyName';
import { DummyRepository } from '../../Domain/DummyRepository';

type Params = {
  id: string;
  name: string;
};
@isUseCase()
export class CreateDummy {
  constructor(
    private readonly repository: DummyRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(params: Params): Promise<void> {
    const dummy = Dummy.create({
      id: DummyId.of(params.id),
      name: DummyName.of(params.name),
    });

    await this.repository.save(dummy);

    await this.eventBus.publish(dummy.pullDomainEvents());
  }
}
