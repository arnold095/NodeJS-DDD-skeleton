/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line node/handle-callback-err */
import { injectable } from 'inversify';
import { BaseError } from '@sharedDomain';
import { ValidationError } from 'class-validator';
import { Context } from 'koa';

type ErrorType = {
  errorCode: number;
  reason: string;
  errors?: Record<string, unknown>;
};

@injectable()
export class ErrorHandler {
  public run(ctx: Context, error: BaseError | Error): void {
    const { errorCode, reason, errors } = this.errorResponse(error);
    ctx.status = errorCode;
    ctx.body = {
      reason,
      errors,
    };
    ctx.app.emit('error', error, ctx);
  }

  private errorResponse(error: BaseError | Error): ErrorType {
    const errorResponse = {
      errorCode: 500,
      reason: 'Internal server error',
      errors: {} as ErrorType['errors'],
    };
    if (error instanceof BaseError) {
      errorResponse.errorCode = error.code;
      errorResponse.reason = error.message;
    } else if (this.isDtoValidation(error)) {
      errorResponse.errorCode = 400;
      errorResponse.reason = 'The request data is not valid.';
      errorResponse.errors = this.validationResponse(error);
    }
    return errorResponse;
  }

  private validationResponse(error: any): ErrorType['errors'] {
    const mappedErrors: ErrorType['errors'] = {};
    for (const err of error.errors) {
      mappedErrors[err.property] = Object.values(err.constraints);
    }
    return mappedErrors;
  }

  private isDtoValidation(error: any) {
    return error.httpCode === 400 && error.errors[0] instanceof ValidationError;
  }
}
