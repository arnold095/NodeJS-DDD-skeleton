import { StringValueObject } from '@sharedDomain';
import { InvalidDummyEmail } from '@dummy';

export class DummyEmail extends StringValueObject {
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  ensureIsValid(): void {
    if (!this.regex.test(this.value)) {
      throw new InvalidDummyEmail(400, `The format email is invalid ${this.value}`);
    }
  }
}
