import { StringValueObject } from '@/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class MailSubject extends StringValueObject {
    contructor(value: string) {
        this.ensureIsValid();
    }

    ensureIsValid() {

    }
}
