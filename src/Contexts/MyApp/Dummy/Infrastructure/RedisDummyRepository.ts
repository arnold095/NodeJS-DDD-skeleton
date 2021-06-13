import { RedisClient } from '@/src/Contexts/Shared/Infrastructure/Persistence/Redis/RedisClient';
import { Dummy, DummyPrimitives } from '../Domain/Dummy';
import { DummyRepository } from '../Domain/DummyRepository';
import { DummyContent } from '../Domain/ValueObject/DummyContent';
import { DummyEmail } from '../Domain/ValueObject/DummyEmail';
import { DummyId } from '../Domain/ValueObject/DummyId';
import { DummyTitle } from '../Domain/ValueObject/DummyTitle';
import { Nullable } from '@/src/Contexts/Shared/Domain/Utils/Nullable';

export class RedisDummyRepository extends RedisClient implements DummyRepository {
  public async find(id: DummyId): Promise<Nullable<Dummy>> {
    let dummy;
    const dummyFound = await this.get<DummyPrimitives>(id.value);
    if (dummyFound !== null) {
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
