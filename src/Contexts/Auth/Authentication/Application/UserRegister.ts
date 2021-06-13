import { inject, injectable } from 'inversify';
import { UserAuthRepository } from '../Domain/UserAuthRepository';
import { EventBus } from '@sharedDomain';
import { UserEncoder } from '@authorization';
import { UserRegisterRequest } from './UserRegisterRequest';
import { UserAuth } from '../Domain/UserAuth';
import { UserAuthId } from '../Domain/ValueObject/UserAuthId';
import { UserAuthEmail } from '../Domain/ValueObject/UserAuthEmail';
import { UserAuthFirstName } from '../Domain/ValueObject/UserAuthFirstName';
import { UserAuthLastName } from '../Domain/ValueObject/UserAuthLastName';
import { UserAlreadyExists } from '../Domain/Exception/UserAlreadyExists';
import { UserAuthPassword } from '../Domain/ValueObject/UserAuthPassword';

@injectable()
export class UserRegister {
  public constructor(
    @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
    @inject('EventBus') private readonly bus: EventBus,
    @inject('UserEncoder') private readonly encoder: UserEncoder
  ) {}

  public async run(request: UserRegisterRequest): Promise<string> {
    const user = await this.processCustomer(request);
    await this.repository.save(user);
    await this.bus.publish(user.pullDomainEvents());
    return this.encoder.run({
      id: user.id.value,
      name: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
    });
  }

  private async processCustomer(request: UserRegisterRequest): Promise<UserAuth> {
    const id = new UserAuthId(request.id);
    const email = new UserAuthEmail(request.email);
    await this.ensureUserDoesNotExist(email);
    const firstName = new UserAuthFirstName(request.firstName);
    const lastName = new UserAuthLastName(request.lastName);
    const password = await this.processAndHashPassword(request.password);
    return UserAuth.register(id, firstName, lastName, email, password);
  }

  private async ensureUserDoesNotExist(email: UserAuthEmail) {
    await this.ensureEmailDoesNotExist(email);
  }

  private async ensureEmailDoesNotExist(email: UserAuthEmail) {
    const user = await this.repository.find(email);
    if (undefined !== user) {
      throw new UserAlreadyExists(403, `The email ${email.value} already exists`);
    }
  }

  private async processAndHashPassword(passwordRequest: string) {
    const password = new UserAuthPassword(passwordRequest);
    const hashedPassword = await password.hashValue();
    return new UserAuthPassword(hashedPassword);
  }
}
