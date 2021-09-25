import { InvalidArgumentError } from '../Exception/InvalidArgumentError';
import { randomUUID } from 'crypto';

const REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export class Uuid {
  public constructor(private _value: string) {
    this.ensureIsValidUuid();
  }

  public static random(): Uuid {
    return new Uuid(randomUUID());
  }

  private ensureIsValidUuid(): void {
    if (!REGEX.test(this.value)) {
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
