import { inject, injectable } from 'inversify';
import { AuthorizationUserEncode } from '@/src/Contexts/Auth/Authorization/Domain/AuthorizationUserEncode';
import { UserEncoderRequest } from '@/src/Contexts/Auth/Authorization/Application/UserEncoderRequest';
import { AuthorizationUser } from '@/src/Contexts/Auth/Authorization/Domain/AuthorizationUser';
import { UserAuthId } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthId';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';
import { UserAuthLastName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthLastName';
import { UserAuthFirstName } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthFirstName';

@injectable()
export class UserEncoder {
  public constructor(
    @inject('AuthorizationUserEncode') private readonly encoder: AuthorizationUserEncode
  ) {}

  public run(request: UserEncoderRequest): string {
    const user = AuthorizationUser.create(
      new UserAuthId(request.id),
      new UserAuthFirstName(request.name),
      new UserAuthLastName(request.lastName),
      new UserAuthEmail(request.email)
    );
    return this.encoder.encode(user);
  }
}
