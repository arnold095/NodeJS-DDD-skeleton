import { inject, injectable } from 'inversify';
import { Body, Controller, HttpCode, Post } from 'routing-controllers';
import { UserRegister, UserRegisterRequest } from '@authentication';

@injectable()
@Controller('/auth')
export class RegisterController {
  public constructor(
    @inject('UserRegister') private readonly userRegister: UserRegister
  ) {}

  @Post('/register')
  @HttpCode(201)
  public async run(@Body() request: UserRegisterRequest): Promise<unknown> {
    return await this.userRegister.run(request);
  }
}
