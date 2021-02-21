import { StringValueObject } from '@/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class MailBody extends StringValueObject {
    contructor(value: string) {
        this.ensureIsValid();
    }

    ensureIsValid() {

    }
}
