import { AdapterTypes } from '@sharedDomain';
import { RegisterController } from '../../Controller/Post/RegisterController';
import { JWTAuthorizationUserEncode, UserEncoder } from '@authorization';
import { LoginController } from '../../Controller/Post/LoginController';
import { TypeOrmUserAuthRepository, UserLogin, UserRegister } from '@authentication';

export class UserAuthContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [RegisterController, LoginController],
      services: [UserRegister, UserEncoder, UserLogin],
      domainContracts: [
        {
          abstract: 'UserAuthRepository',
          concrete: TypeOrmUserAuthRepository,
        },
        {
          abstract: 'AuthorizationUserEncode',
          concrete: JWTAuthorizationUserEncode,
        },
      ],
    };
  }
}
