import { InvalidArgumentError } from '../Exceptions/InvalidArgumentError';

export abstract class ValueObject<T> {
  protected constructor(protected readonly _value: T) {
    this.verifyValueIsDefined(_value);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (!valueObject) {
      return false;
    }

    return this.value === valueObject.value;
  }

  protected verifyValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError('Value must be defined');
    }
  }

  public get value(): T {
    return this._value;
  }
}
