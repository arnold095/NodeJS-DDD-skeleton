import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { UserAuthEmail } from '../../../../../src/Contexts/Auth/Authentication';

export class UserAuthEmailMother extends MotherCreator {
  public static create(email?: string): UserAuthEmail {
    return new UserAuthEmail(email ?? this.random().internet.email());
  }
}
