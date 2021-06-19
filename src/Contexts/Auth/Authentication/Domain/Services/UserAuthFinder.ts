import {
  InvalidCredentials,
  UserAuth,
  UserAuthEmail,
  UserAuthRepository,
} from '@authentication';

export class UserAuthFinder {
  constructor(private readonly repository: UserAuthRepository) {}

  public async run(email: UserAuthEmail): Promise<UserAuth> {
    const user = await this.repository.find(email);
    if (!user) {
      throw new InvalidCredentials();
    }
    return user;
  }
}
