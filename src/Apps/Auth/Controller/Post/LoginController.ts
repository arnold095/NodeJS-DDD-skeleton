import { inject, injectable } from 'inversify';
import { Body, Controller, Post } from 'routing-controllers';
import { UserLogin, UserLoginRequest } from '@authentication';

@injectable()
@Controller('/auth')
export class LoginController {
  public constructor(@inject('UserLogin') private readonly userLogin: UserLogin) {}

  @Post('/login')
  public async run(@Body() request: UserLoginRequest): Promise<unknown> {
    return await this.userLogin.run(request);
  }
}
