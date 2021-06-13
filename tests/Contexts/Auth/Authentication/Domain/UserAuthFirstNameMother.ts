import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { UserAuthFirstName } from '../../../../../src/Contexts/Auth/Authentication';

export class UserAuthFirstNameMother extends MotherCreator {
  public static create(): UserAuthFirstName {
    return new UserAuthFirstName(this.random().name.firstName());
  }
}
