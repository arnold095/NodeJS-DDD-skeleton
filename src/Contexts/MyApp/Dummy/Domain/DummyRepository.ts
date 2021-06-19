import { Dummy, DummyId } from '@dummy';
import { Nullable } from '@sharedDomain';

export interface DummyRepository {
  find(id: DummyId): Promise<Nullable<Dummy>>;
  save(dummy: Dummy): Promise<void>;
}
