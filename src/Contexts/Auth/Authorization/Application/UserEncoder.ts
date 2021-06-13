import { inject, injectable } from 'inversify';
import { AuthorizationUserEncode } from '../Domain/AuthorizationUserEncode';
import { UserEncoderRequest } from './UserEncoderRequest';
import { AuthorizationUser } from '../Domain/AuthorizationUser';
import { UserAuthEmail, UserAuthFirstName, UserAuthId, UserAuthLastName } from '@authentication';

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
