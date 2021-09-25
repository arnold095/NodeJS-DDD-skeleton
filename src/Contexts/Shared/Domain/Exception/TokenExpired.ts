import { BaseError } from '@sharedDomain';

export class TokenExpired extends BaseError {
  public static readonly ERROR_CODE = 403;
  public static readonly MESSAGE = 'The token has expired';

  constructor() {
    super(TokenExpired.ERROR_CODE, TokenExpired.MESSAGE);
  }
}
