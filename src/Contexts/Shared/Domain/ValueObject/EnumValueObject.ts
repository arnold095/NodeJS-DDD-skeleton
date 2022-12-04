/* eslint-disable @typescript-eslint/restrict-template-expressions */
export abstract class EnumValueObject<T> {
  constructor(public readonly value: T, public readonly validValues: T[]) {
    this.checkValueIsValid();
  }

  public checkValueIsValid(): void {
    if (!this.validValues.includes(this.value)) {
      this.throwErrorForInvalidValue(this.value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
