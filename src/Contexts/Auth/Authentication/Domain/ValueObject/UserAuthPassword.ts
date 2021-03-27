import { Bcrypt } from "@/Contexts/Shared/Domain/ValueObject/Bcrypt";
import { InvalidUserPassword } from "@/Contexts/Auth/Authentication/Domain/Exception/InvalidUserPassword";

export class UserAuthPassword extends Bcrypt {
    private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;

    public constructor(value: string) {
        super(value);
        this.ensureIsValid();
    }

    public ensureIsValid() {
        if (!this.regex.test(this.value)) {
            throw new InvalidUserPassword(`The password must contain lower case, upper case, numbers and symbols and at least 6 characters`);
        }
    }

    public async hashValue(): Promise<string> {
        return await this.hash(this.value);
    }

    public async isEquals(other: string): Promise<boolean> {
        return await this.match(other, this.value);
    }
}
