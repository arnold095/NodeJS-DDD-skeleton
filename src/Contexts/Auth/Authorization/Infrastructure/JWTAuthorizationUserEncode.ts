import { Algorithm, sign, SignOptions } from 'jsonwebtoken';
import { injectable } from 'inversify';
import { AuthorizationUser, AuthorizationUserEncode } from '@authorization';

@injectable()
export class JWTAuthorizationUserEncode implements AuthorizationUserEncode {
  private readonly secret = process.env.JWT_ALGORITHM ?? 'HS512';
  private readonly algorithm = process.env.JWT_ALGORITHM as Algorithm;
  private readonly expiresInSeconds = parseInt(
    process.env.JWT_EXPIRES_IN_SECONDS ?? '3600'
  );

  public encode(user: AuthorizationUser): string {
    const payload = user.toPrimitives();
    return sign(payload, this.secret, this.signingOptions());
  }

  private signingOptions(): SignOptions {
    return {
      algorithm: this.algorithm,
      expiresIn: this.expiresInSeconds,
    };
  }
}
