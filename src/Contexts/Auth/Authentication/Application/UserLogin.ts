import { inject, injectable } from 'inversify';
import { UserAuthRepository } from '../Domain/UserAuthRepository';
import { UserEncoder } from '@authorization';
import { EventBus } from '@sharedDomain';
import { UserLoginRequest } from './UserLoginRequest';
import { UserAuthEmail } from '../Domain/ValueObject/UserAuthEmail';
import { UserAuthFinder } from '../Domain/Services/UserAuthFinder';

@injectable()
export class UserLogin {
  private finder: UserAuthFinder;
  public constructor(
    @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
    @inject('EventBus') private readonly bus: EventBus,
    @inject('UserEncoder') private readonly encoder: UserEncoder
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
