export class DateValueObject {
  constructor(private _value: Date) {}

  get value(): Date {
    return this._value;
  }

  public static currentDate(): DateValueObject {
    const date = new Date().toISOString();
    return new DateValueObject(new Date(date));
  }
}
