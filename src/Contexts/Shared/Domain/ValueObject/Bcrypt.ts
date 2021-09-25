import { compare, hash } from 'bcrypt';

export class Bcrypt {
  private readonly BCRYPT_PASSWORD_SALT = process.env.BCRYPT_PASSWORD_SALT
    ? parseInt(process.env.BCRYPT_PASSWORD_SALT)
    : 12;

  constructor(private _value: string) {}

  public get value(): string {
    return this._value;
  }

  public async hash(plainText: string): Promise<string> {
    return await hash(plainText, this.BCRYPT_PASSWORD_SALT);
  }

  public async match(plainText: string, hashedText: string): Promise<boolean> {
    return await compare(plainText, hashedText);
  }
}
