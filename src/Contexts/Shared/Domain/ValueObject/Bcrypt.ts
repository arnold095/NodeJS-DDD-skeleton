import { compare, hash } from 'bcrypt';

export class Bcrypt {
    constructor(private _value: string) {
    }

    public get value(): string {
        return this._value;
    }

    public async hash(plainText: string): Promise<string> {
        return await hash(plainText, 10);
    }

    public async match(plainText: string, hashedText: string): Promise<boolean> {
        return await compare(plainText, hashedText);
    }
}
