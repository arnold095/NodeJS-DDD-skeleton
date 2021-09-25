import { EventBus } from '@sharedDomain';
import {
  UserAlreadyExists,
  UserAuth,
  UserAuthEmail,
  UserAuthFirstName,
  UserAuthId,
  UserAuthLastName,
  UserAuthPassword,
  UserAuthRepository,
  UserRegisterRequest,
} from '@authentication';

export class UserRegister {
  public constructor(
    private readonly repository: UserAuthRepository,
    private readonly bus: EventBus
  ) {}

  public async run(request: UserRegisterRequest): Promise<void> {
    const user = await this.processCustomer(request);
    await this.repository.save(user);
    await this.bus.publish(user.pullDomainEvents());
  }

  private async processCustomer(request: UserRegisterRequest): Promise<UserAuth> {
    const id = new UserAuthId(request.id);
    const email = new UserAuthEmail(request.email);
    await this.ensureEmailDoesNotExist(email);
    const firstName = new UserAuthFirstName(request.firstName);
    const lastName = new UserAuthLastName(request.lastName);
    const password = await this.processAndHashPassword(request.password);
    return UserAuth.register(id, firstName, lastName, email, password);
  }

  private async ensureEmailDoesNotExist(email: UserAuthEmail) {
    const user = await this.repository.find(email);
    if (undefined !== user) {
      throw new UserAlreadyExists();
    }
  }

  private async processAndHashPassword(passwordRequest: string) {
    const password = new UserAuthPassword(passwordRequest);
    const hashedPassword = await password.hashValue();
    return new UserAuthPassword(hashedPassword);
  }
}
