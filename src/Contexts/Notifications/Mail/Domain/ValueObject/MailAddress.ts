import { StringValueObject } from '@/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class MailAddress extends StringValueObject {
    contructor(value: string) {
        this.ensureIsValid();
    }

    ensureIsValid() {

    }
}
