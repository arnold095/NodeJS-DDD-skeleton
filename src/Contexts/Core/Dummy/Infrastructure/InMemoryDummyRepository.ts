import { Nullable } from '../../../Shared/Domain';
import { Dummy } from '../Domain/Dummy';
import { DummyId } from '../Domain/DummyId';
import { DummyRepository } from '../Domain/DummyRepository';

export class InMemoryDummyRepository implements DummyRepository {
  public constructor(private readonly dummies: Dummy[] = []) {}

  public async save(dummy: Dummy): Promise<void> {
    const index = this.dummies.findIndex(d => d.id.equals(dummy.id));
    if (index === -1) {
      this.dummies.push(dummy);
    } else {
      this.dummies[index] = dummy;
    }

    await Promise.resolve();
  }

  public find(id: DummyId): Promise<Nullable<Dummy>> {
    return Promise.resolve(this.dummies.find(d => d.id.equals(id)));
  }
}
