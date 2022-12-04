import { Dummy } from './Dummy';
import { Nullable } from '../../../Shared/Domain/Utils/Nullable';
import { DummyId } from './DummyId';

export abstract class DummyRepository {
  abstract save(dummy: Dummy): Promise<void>;

  abstract find(id: DummyId): Promise<Nullable<Dummy>>;
}
