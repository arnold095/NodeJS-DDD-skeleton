import { BaseError } from '@sharedDomain';

export class NotAuthorized extends BaseError {
  public static readonly ERROR_CODE = 403;
  public static readonly MESSAGE = 'You are not authorized';

  constructor() {
    super(NotAuthorized.ERROR_CODE, NotAuthorized.MESSAGE);
  }
}
