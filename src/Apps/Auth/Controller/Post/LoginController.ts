import { Context, Response } from 'koa';
import { controller, httpPost } from 'decorator-koa-router';
import { KoaBaseController, validateDto } from '@sharedInfra';
import { UserLogin, UserLoginRequest } from '@authentication';

@controller('/auth')
export class LoginController extends KoaBaseController {
  public constructor(private readonly userLogin: UserLogin) {
    super();
  }

  @httpPost('/login', validateDto(UserLoginRequest))
  public async run({ response, dtoBody }: Context): Promise<Response> {
    console.info('llego!');
    const jwt = await this.userLogin.run(dtoBody);
    return this.ok({ jwt }, response);
  }
}
