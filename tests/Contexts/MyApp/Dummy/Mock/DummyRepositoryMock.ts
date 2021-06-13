import { Dummy, DummyId, DummyRepository } from '../../../../../src/Contexts/MyApp/Dummy';

export class DummyRepositoryMock implements DummyRepository {
  private mockedDummy: Dummy[] = [];

  public async find(id: DummyId): Promise<Dummy> {
    return this.mockedDummy.find((dummy) => {
      return dummy.id.equals(id);
    });
  }

  public async save(dummy: Dummy): Promise<void> {
    this.mockedDummy.push(dummy);
  }
}
