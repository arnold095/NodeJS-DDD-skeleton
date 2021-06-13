import { inject, injectable } from 'inversify';
import { Body, Controller, Post } from 'routing-controllers';
import { UserLogin } from '@/src/Contexts/Auth/Authentication/Application/UserLogin';
import { UserLoginRequest } from '@/src/Contexts/Auth/Authentication/Application/UserLoginRequest';

@injectable()
@Controller('/auth')
export class LoginController {
  public constructor(@inject('UserLogin') private readonly userLogin: UserLogin) {}

  @Post('/login')
  public async run(@Body() request: UserLoginRequest): Promise<unknown> {
    return await this.userLogin.run(request);
  }
}
