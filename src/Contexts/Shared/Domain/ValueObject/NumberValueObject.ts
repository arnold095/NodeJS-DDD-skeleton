import { ValueObject } from './ValueObject';

export class NumberValueObject extends ValueObject<number> {
  public constructor(value: number) {
    super(value);
  }

  public lessThan(other: number): boolean {
    return this.value < other;
  }

  public isBiggerThan(other: number): boolean {
    return this.value > other;
  }
}
