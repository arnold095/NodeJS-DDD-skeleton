import { UserEncoder } from '@authorization';
import { EventBus } from '@sharedDomain';
import {
  UserLoginRequest,
  UserAuthEmail,
  UserAuthFinder,
  UserAuthRepository,
} from '@authentication';

export class UserLogin {
  private finder: UserAuthFinder;
  public constructor(
    private readonly repository: UserAuthRepository,
    private readonly bus: EventBus,
    private readonly encoder: UserEncoder
  ) {
    this.finder = new UserAuthFinder(this.repository);
  }

  public async run(request: UserLoginRequest): Promise<string> {
    const email = new UserAuthEmail(request.email);
    const user = await this.finder.run(email);
    await user.isValidPassword(request.password);
    await this.bus.publish(user.pullDomainEvents());
    return this.encoder.run({
      id: user.id.value,
      name: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
    });
  }
}
