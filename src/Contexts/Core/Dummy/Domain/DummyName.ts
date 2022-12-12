import { StringValueObject } from '../../../Shared/Domain';

export class DummyName extends StringValueObject {
  public static of(value: string): DummyName {
    return new DummyName(value);
  }
}
