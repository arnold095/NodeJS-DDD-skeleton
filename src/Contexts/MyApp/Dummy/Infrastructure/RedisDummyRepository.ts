import { RedisClient } from "@/Contexts/Shared/Infrastructure/Persistence/Redis/RedisClient";
import { Dummy } from "../Domain/Dummy";
import { DummyRepository } from "../Domain/DummyRepository";
import { DummyContent } from "../Domain/ValueObject/DummyContent";
import { DummyId } from "../Domain/ValueObject/DummyId";
import { DummyTitle } from "../Domain/ValueObject/DummyTitle";


export class RedisDummyRepository extends RedisClient implements DummyRepository {
    public async find(id: DummyId): Promise<Dummy> {
        let dummy: Dummy;
        const dummyFound = await this.get(id.value);
        if (null !== dummyFound) {
            dummy = new Dummy(
                new DummyId(dummyFound.id),
                new DummyTitle(dummyFound.title),
                new DummyContent(dummyFound.content)
            );
        }
        return dummy;
    }

    public async save(dummy: Dummy): Promise<void> {
        const primitives = {
            id: dummy.id.value,
            title: dummy.title.value,
            content: dummy.title.value
        };
        await this.set(dummy.id.value, primitives);
    }

}