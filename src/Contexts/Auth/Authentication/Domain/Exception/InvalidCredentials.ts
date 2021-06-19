import { BaseError } from '@sharedDomain';

export class InvalidCredentials extends BaseError {
  public static readonly ERROR_CODE = 404;
  public static readonly MESSAGE = 'The email or password is not correct';
  constructor() {
    super(InvalidCredentials.ERROR_CODE, InvalidCredentials.MESSAGE);
  }
}
