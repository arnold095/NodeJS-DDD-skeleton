import { v4, validate } from 'uuid';
import { InvalidArgumentError } from '../Exception/InvalidArgumentError';

export class Uuid {
  public constructor(private _value: string) {
    this.ensureIsValidUuid();
  }

  public static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(): void {
    if (!validate(this.value)) {
      throw new InvalidArgumentError(
        400,
        `<${this.constructor.name}> does not allow the value <${this.value}>`
      );
    }
  }

  public equals(other: Uuid): boolean {
    return this.value === other.value;
  }

  public get value(): string {
    return this._value;
  }
}
