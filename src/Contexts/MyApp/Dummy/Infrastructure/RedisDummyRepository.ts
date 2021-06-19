import { RedisClient } from '@sharedInfra';
import {
  Dummy,
  DummyContent,
  DummyEmail,
  DummyId,
  DummyPrimitives,
  DummyRepository,
  DummyTitle,
} from '@dummy';
import { Nullable } from '@sharedDomain';

export class RedisDummyRepository extends RedisClient implements DummyRepository {
  public async find(id: DummyId): Promise<Nullable<Dummy>> {
    let dummy;
    const dummyFound = await this.get<DummyPrimitives>(id.value);
    if (dummyFound !== undefined) {
      dummy = new Dummy(
        new DummyId(dummyFound.id),
        new DummyTitle(dummyFound.title),
        new DummyContent(dummyFound.content),
        new DummyEmail(dummyFound.email)
      );
    }
    return dummy;
  }

  public async save(dummy: Dummy): Promise<void> {
    const primitives = {
      id: dummy.id.value,
      title: dummy.title.value,
      content: dummy.title.value,
      email: dummy.email.value,
    };
    await this.set(dummy.id.value, primitives);
  }
}
