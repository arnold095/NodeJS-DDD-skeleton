import { Context, Response } from 'koa';
import { controller, httpPost } from 'decorator-koa-router';
import { KoaBaseController, validateDto } from '@sharedInfra';
import { UserRegister, UserRegisterRequest } from '@authentication';

@controller('/auth')
export class RegisterController extends KoaBaseController {
  public constructor(private readonly userRegister: UserRegister) {
    super();
  }

  @httpPost('/register', validateDto(UserRegisterRequest))
  public async run({ dtoBody, response }: Context): Promise<Response> {
    const jwt = await this.userRegister.run(dtoBody);
    return this.ok({ jwt }, response);
  }
}
