import { BaseError } from '@sharedDomain';

export class InvalidUserPassword extends BaseError {
  public static readonly ERROR_CODE = 403;
  public static readonly MESSAGE =
    'The password must contain lower case, upper case, numbers and symbols and at least 6 characters';

  constructor() {
    super(InvalidUserPassword.ERROR_CODE, InvalidUserPassword.MESSAGE);
  }
}
