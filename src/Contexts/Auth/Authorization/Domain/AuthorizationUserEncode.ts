import { AuthorizationUser } from '@/src/Contexts/Auth/Authorization/Domain/AuthorizationUser';

export interface AuthorizationUserEncode {
  encode(user: AuthorizationUser): string;
}
