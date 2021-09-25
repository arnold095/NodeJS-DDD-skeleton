import { RedisClient } from '@sharedInfra';
import { Dummy, DummyId, DummyRepository } from '@dummy';
import { Nullable } from '@sharedDomain';

export class RedisDummyRepository extends RedisClient implements DummyRepository {
  public async find(id: DummyId): Promise<Nullable<Dummy>> {
    let dummy;
    const dummyFound = await this.get(id.value);
    if (dummyFound) {
      dummy = Dummy.fromPrimitives(JSON.parse(dummyFound));
    }
    return dummy;
  }

  public async save(dummy: Dummy): Promise<void> {
    await this.set(dummy.id.value, dummy.toPrimitives());
  }
}
