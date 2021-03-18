import { DateValueObject } from "@/Contexts/Shared/Domain/ValueObject/DateValueObject";

export class UserAuthDateAdd extends DateValueObject {
    public constructor(value: Date) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {

    }
}
