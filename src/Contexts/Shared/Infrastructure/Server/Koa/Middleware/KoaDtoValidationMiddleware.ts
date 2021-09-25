import { ClassType, transformAndValidate } from 'class-transformer-validator';
import { Context, Request, Next } from 'koa';
import { ValidationError } from 'class-validator';
import { DtoValidationError } from '../Exception/DtoValidationError';

export function validateDto<T>(dtoClass: ClassType<T>) {
  return async function classValidate(ctx: Context, next: Next): Promise<void> {
    ClassValidation.init(ctx);
    try {
      ctx.dtoBody = await ClassValidation.body<T>(dtoClass);
    } catch (error) {
      throw new DtoValidationError(
        ClassValidation.mappedError(error as ValidationError[])
      );
    }
    await next();
  };
}

class ClassValidation {
  private static req: Request;
  private static validationOptions = {
    validator: {
      whitelist: true,
    },
  };

  static init({ request }: Context) {
    this.req = request;
  }

  static async body<T>(dtoClass: ClassType<T>): Promise<unknown> {
    if (
      !this.req.body ||
      typeof this.req.body === 'string' ||
      !Object.keys(this.req.body).length
    ) {
      throw new Error('no-body');
    }
    return await transformAndValidate(
      this.dtoToValidate(dtoClass),
      this.req.body,
      this.validationOptions
    );
  }

  private static dtoToValidate<T extends Record<string, unknown>>(
    dtoClass: unknown
  ): ClassType<T> {
    return dtoClass as ClassType<T>;
  }

  public static mappedError(errors: ValidationError[]): Record<string, string>[] {
    return errors.map((error) => {
      const { property, constraints } = error;
      let reason: Record<string, string> | string = constraints || {};
      if (reason) {
        [reason] = Object.values(reason);
      }
      return {
        property,
        reason,
      };
    });
  }
}
