import { UuidValueObject } from '../../../Shared/Domain';

export class DummyId extends UuidValueObject {
  public static of(value: string): DummyId {
    return new DummyId(value);
  }
}
