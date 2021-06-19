import { AdapterTypes } from '@sharedDomain';
import { RegisterController } from '../../Controller/Post/RegisterController';
import { JWTAuthorizationUserEncode, UserEncoder } from '@authorization';
import { LoginController } from '../../Controller/Post/LoginController';
import { UserLogin, UserRegister } from '@authentication';
import { MongoDbUserAuthRepository } from '../../../../Contexts/Auth/Authentication/Infrastructure/MongoDbUserAuthRepository';

export class UserAuthContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [RegisterController, LoginController],
      services: [UserRegister, UserEncoder, UserLogin],
      domainContracts: [
        {
          abstract: 'AuthorizationUserEncode',
          concrete: JWTAuthorizationUserEncode,
        },
        {
          abstract: 'UserAuthRepository',
          concrete: MongoDbUserAuthRepository,
        },
      ],
    };
  }
}
