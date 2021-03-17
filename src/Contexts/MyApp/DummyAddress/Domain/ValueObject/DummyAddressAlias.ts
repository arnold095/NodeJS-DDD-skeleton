import { StringValueObject } from '@/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class DummyAddressAlias extends StringValueObject {
    public constructor(value: string) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {

    }
}
