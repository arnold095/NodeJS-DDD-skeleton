import { JwtPayload, verify } from 'jsonwebtoken';
import { TokenExpired } from '@sharedDomain';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export class JwtVerifier {
  private static _publicKey: string;

  public static async run(jwt: string): Promise<JwtPayload | string> {
    try {
      return verify(jwt, this.publicKey());
    } catch (e) {
      throw new TokenExpired();
    }
  }

  private static publicKey(): string {
    if (this._publicKey === undefined) {
      const fileName = process.env.JWT_PUBLIC_KEY ?? '';
      const path = resolve(__dirname, '../../../../../', fileName);
      this._publicKey = readFileSync(path).toString();
    }
    return this._publicKey;
  }
}
