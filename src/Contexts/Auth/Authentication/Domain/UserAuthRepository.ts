import { UserAuth } from './UserAuth';
import { UserAuthEmail } from './ValueObject/UserAuthEmail';

export interface UserAuthRepository {
  save(user: UserAuth): Promise<void>;

  find(email: UserAuthEmail): Promise<UserAuth>;
}
