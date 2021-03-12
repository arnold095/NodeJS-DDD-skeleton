import { DateValueObject } from '@/Contexts/Shared/Domain/ValueObject/DateValueObject';

export class DummyAddressDateUpd extends DateValueObject {
    public constructor(value: Date) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {

    }
}
