import { BaseError } from '@sharedDomain';

export class DummyNotFound extends BaseError {
  public static readonly ERROR_CODE = 404;
  public static readonly MESSAGE = 'Dummy not found.';
  constructor() {
    super(DummyNotFound.ERROR_CODE, DummyNotFound.MESSAGE);
  }
}
