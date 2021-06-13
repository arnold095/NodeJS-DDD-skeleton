import { AuthorizationUser } from '@authorization';

export interface AuthorizationUserEncode {
  encode(user: AuthorizationUser): string;
}
