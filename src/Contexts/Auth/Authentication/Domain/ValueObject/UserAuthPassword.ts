import { Bcrypt } from '@sharedDomain';
import { InvalidUserPassword } from '@authentication';

export class UserAuthPassword extends Bcrypt {
  private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;

  public constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  public static async createAndHash(plainText: string): Promise<UserAuthPassword> {
    const password = new UserAuthPassword(plainText);
    return new UserAuthPassword(await password.hashValue());
  }

  public ensureIsValid(): void {
    if (!this.regex.test(this.value)) {
      throw new InvalidUserPassword(
        `The password must contain lower case, upper case, numbers and symbols and at least 6 characters`
      );
    }
  }

  public async hashValue(): Promise<string> {
    return await this.hash(this.value);
  }

  public async isEquals(other: string): Promise<boolean> {
    return await this.match(other, this.value);
  }

  public async change(newPassword: string): Promise<UserAuthPassword> {
    return await UserAuthPassword.createAndHash(newPassword);
  }
}
