import { inject, injectable } from 'inversify';
import { Body, Controller, Post, Res } from 'routing-controllers';
import { UserLogin, UserLoginRequest } from '@authentication';
import { BaseController } from '../BaseController';
import { Response } from 'koa';

@injectable()
@Controller('/auth')
export class LoginController extends BaseController {
  public constructor(@inject('UserLogin') private readonly userLogin: UserLogin) {
    super();
  }

  @Post('/login')
  public async run(
    @Body() request: UserLoginRequest,
    @Res() res: Response
  ): Promise<unknown> {
    const jwt = await this.userLogin.run(request);
    return this.ok({ jwt }, res);
  }
}
