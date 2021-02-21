import { DummyRepository } from "../../../../../src/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyId } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { Dummy } from "../../../../../src/Contexts/MyApp/Dummy/Domain/Dummy";

export class DummyRepositoryMock implements DummyRepository {
    private mockedDummy: Dummy[] = [];

    public async find(id: DummyId): Promise<Dummy> {
        return this.mockedDummy.find(dummy => {
            return dummy.id.equals(id);
        });
    }

    public async save(dummy: Dummy): Promise<void> {
        this.mockedDummy.push(dummy);
    }

}
