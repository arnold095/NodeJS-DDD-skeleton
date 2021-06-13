import { Dummy, DummyId } from '@dummy';

export interface DummyRepository {
  find(id: DummyId): Promise<Dummy>;
  save(dummy: Dummy): Promise<void>;
}
