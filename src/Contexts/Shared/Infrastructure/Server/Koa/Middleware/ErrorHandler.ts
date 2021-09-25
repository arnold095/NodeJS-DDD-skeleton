import { BaseError } from '@sharedDomain';
import { Context } from 'koa';
import { DtoValidationError } from '../Exception/DtoValidationError';

type ErrorType = {
  errorCode: number;
  message: string;
  errors?: Record<string, unknown>[];
};

export class ErrorHandler {
  public run(ctx: Context, error: BaseError | Error): void {
    const { errorCode, message, errors } = this.errorResponse(error);
    ctx.status = errorCode;
    ctx.body = {
      message,
      errors,
    };
    ctx.app.emit('error', error, ctx);
  }

  private errorResponse(error: BaseError | Error): ErrorType {
    const errorResponse = {
      errorCode: 500,
      message: 'Internal server error',
      errors: [] as ErrorType['errors'],
    };
    if (error instanceof BaseError) {
      errorResponse.errorCode = error.code;
    }
    if (error instanceof DtoValidationError) {
      errorResponse.errors = error.errors;
    }
    errorResponse.message = error.message;
    return errorResponse;
  }
}
