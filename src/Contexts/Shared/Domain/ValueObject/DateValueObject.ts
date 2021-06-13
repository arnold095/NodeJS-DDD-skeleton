import { InvalidArgumentError } from '../Exception/InvalidArgumentError';

export class DateValueObject {
  constructor(private _value: Date) {
    this.ensureTheDateIsValid();
  }

  private ensureTheDateIsValid() {
    if (!(this.value instanceof Date)) {
      throw new InvalidArgumentError(400, 'The date format is not valid');
    }
  }

  get value(): Date {
    return this._value;
  }

  public static currentDate(): DateValueObject {
    const now = new Date();
    const utcTimeStamp = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );
    const date = new Date(utcTimeStamp);
    return new DateValueObject(date);
  }
}
