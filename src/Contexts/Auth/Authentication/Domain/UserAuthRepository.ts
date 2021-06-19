import { UserAuth } from './UserAuth';
import { UserAuthEmail } from './ValueObject/UserAuthEmail';
import { Nullable } from '@sharedDomain';

export interface UserAuthRepository {
  save(user: UserAuth): Promise<void>;

  find(email: UserAuthEmail): Promise<Nullable<UserAuth>>;
}
