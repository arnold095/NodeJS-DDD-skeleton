import {
  UserAuth,
  UserAuthEmail,
  UserAuthRepository,
} from '../../../../../src/Contexts/Auth/Authentication';

export class UserAuthRepositoryMock implements UserAuthRepository {
  private mockedUser: UserAuth[] = [];

  public async find(email: UserAuthEmail): Promise<UserAuth> {
    return this.mockedUser.find((user) => user.email.value === email.value);
  }

  public async save(user: UserAuth): Promise<void> {
    this.mockedUser.push(user);
  }
}
