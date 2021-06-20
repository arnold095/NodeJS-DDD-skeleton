import { BaseError } from '@sharedDomain';

export class UserAlreadyExists extends BaseError {
  public static readonly ERROR_CODE = 403;
  public static readonly MESSAGE = 'The email already exists';

  constructor() {
    super(UserAlreadyExists.ERROR_CODE, UserAlreadyExists.MESSAGE);
  }
}
