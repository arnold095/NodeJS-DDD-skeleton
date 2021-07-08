import { inject, injectable } from 'inversify';
import { Body, Controller, Post, Res } from 'routing-controllers';
import { UserRegister, UserRegisterRequest } from '@authentication';
import { Response } from 'koa';
import { BaseController } from '../BaseController';

@injectable()
@Controller('/auth')
export class RegisterController extends BaseController {
  public constructor(
    @inject('UserRegister') private readonly userRegister: UserRegister
  ) {
    super();
  }

  @Post('/register')
  public async run(
    @Body() request: UserRegisterRequest,
    @Res() res: Response
  ): Promise<unknown> {
    const jwt = await this.userRegister.run(request);
    return this.ok(jwt, res);
  }
}
