import { BaseError } from '@sharedDomain';

export class DtoValidationError extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE = 'There was an error validating the data';
  constructor(public errors: Record<string, string>[] = []) {
    super(DtoValidationError.ERROR_CODE, DtoValidationError.MESSAGE);
  }
}
