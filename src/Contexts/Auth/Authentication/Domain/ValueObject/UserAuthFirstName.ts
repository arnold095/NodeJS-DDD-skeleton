import { StringValueObject } from '@/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class UserAuthFirstName extends StringValueObject {
    public constructor(value: string) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {

    }
}
