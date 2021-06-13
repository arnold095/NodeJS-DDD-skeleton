import { RegisterController } from '@/src/Apps/Auth/Controller/Post/RegisterController';
import { LoginController } from '@/src/Apps/Auth/Controller/Post/LoginController';
import { UserLogin } from '@/src/Contexts/Auth/Authentication/Application/UserLogin';
import { UserRegister } from '@/src/Contexts/Auth/Authentication/Application/UserRegister';
import { UserEncoder } from '@/src/Contexts/Auth/Authorization/Application/UserEncoder';
import { TypeOrmUserAuthRepository } from '@/src/Contexts/Auth/Authentication/Infrastructure/TypeOrmUserAuthRepository';
import { JWTAuthorizationUserEncode } from '@/src/Contexts/Auth/Authorization/Infrastructure/JWTAuthorizationUserEncode';
import { AdapterTypes } from '@/src/Contexts/Shared/Domain/Server/AdapterTypes';

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
