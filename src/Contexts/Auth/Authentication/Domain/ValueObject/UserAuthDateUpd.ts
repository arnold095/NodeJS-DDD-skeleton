import { DateValueObject } from "@/Contexts/Shared/Domain/ValueObject/DateValueObject";

export class UserAuthDateUpd extends DateValueObject {
    public constructor(value: Date) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {

    }
}
