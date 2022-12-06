import { Nullable } from '../../../Shared/Domain/Utils/Nullable';
import { Dummy } from './Dummy';
import { DummyId } from './DummyId';

export abstract class DummyRepository {
  abstract save(dummy: Dummy): Promise<void>;

  abstract find(id: DummyId): Promise<Nullable<Dummy>>;
}
