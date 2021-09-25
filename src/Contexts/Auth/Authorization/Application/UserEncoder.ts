import {
  AuthorizationUser,
  AuthorizationUserEncode,
  UserEncoderRequest,
} from '@authorization';
import {
  UserAuthEmail,
  UserAuthFirstName,
  UserAuthId,
  UserAuthLastName,
} from '@authentication';

export class UserEncoder {
  public constructor(private readonly encoder: AuthorizationUserEncode) {}

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
