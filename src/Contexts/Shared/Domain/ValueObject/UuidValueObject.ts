import { randomUUID } from 'crypto';

import { InvalidArgumentError } from '../Exceptions/InvalidArgumentError';

const REGEX = /^[\da-f]{8}-[\da-f]{4}-[0-5][\da-f]{3}-[089ab][\da-f]{3}-[\da-f]{12}$/i;

export class UuidValueObject {
  public constructor(private readonly _value: string) {
    this.ensureIsValidUuid();
  }

  public static random(): UuidValueObject {
    return new UuidValueObject(randomUUID());
  }

  private ensureIsValidUuid(): void {
    if (!REGEX.test(this.value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${this.value}>`,
      );
    }
  }

  public equals(other: UuidValueObject): boolean {
    return this.value === other.value;
  }

  public get value(): string {
    return this._value;
  }
}
