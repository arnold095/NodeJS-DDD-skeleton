import { UserAuth, UserAuthEmail, UserAuthRepository } from '@authentication';
import { Nullable } from '@sharedDomain';
import { UserAuthMother } from '../Domain/UserAuthMother';
import { injectable } from 'inversify';

@injectable()
export class UserAuthRepositoryMock implements UserAuthRepository {
  private mockedUsers: Map<string, UserAuth> = new Map();

  public async find(email: UserAuthEmail): Promise<Nullable<UserAuth>> {
    return this.mockedUsers.get(email.value);
  }

  public async save(user: UserAuth): Promise<void> {
    this.mockedUsers.set(user.email.value, user);
  }

  public async generate(max = 10): Promise<void> {
    const users = await this.generateUsers(max);
    for (const user of users) {
      this.mockedUsers.set(user.email.value, user);
    }
  }

  private async generateUsers(max: number): Promise<UserAuth[]> {
    const promises = [];
    for (let i = 0; i <= max; i++) {
      promises.push(UserAuthMother.create());
    }
    return await Promise.all(promises);
  }

  public clear(): void {
    this.mockedUsers.clear();
  }
}
