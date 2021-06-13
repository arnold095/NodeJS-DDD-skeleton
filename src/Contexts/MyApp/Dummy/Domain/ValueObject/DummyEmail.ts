import { StringValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/StringValueObject';
import { InvalidDummyEmail } from '../Exception/InvalidDummyEmail';

export class DummyEmail extends StringValueObject {
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  ensureIsValid(): void {
    if (!this.regex.test(this.value)) {
      throw new InvalidDummyEmail(`The format email is invalid ${this.value}`);
    }
  }
}
