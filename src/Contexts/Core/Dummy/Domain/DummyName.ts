import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';

export class DummyName extends StringValueObject {
  public static of(value: string): DummyName {
    return new DummyName(value);
  }
}
