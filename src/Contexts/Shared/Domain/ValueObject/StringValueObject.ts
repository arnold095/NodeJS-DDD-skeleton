export abstract class StringValueObject {
  public constructor(private _value: string) {}

  public get value(): string {
    return this._value;
  }
}
