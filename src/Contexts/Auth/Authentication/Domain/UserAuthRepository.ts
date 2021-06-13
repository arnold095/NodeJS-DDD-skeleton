import { UserAuth } from '@/src/Contexts/Auth/Authentication/Domain/UserAuth';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';

export interface UserAuthRepository {
  save(user: UserAuth): Promise<void>;

  find(email: UserAuthEmail): Promise<UserAuth>;
}
