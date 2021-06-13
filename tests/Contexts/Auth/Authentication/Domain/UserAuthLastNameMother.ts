import { UserAuthLastName } from '../../../../../src/Contexts/Auth/Authentication';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class UserAuthLastNameMother extends MotherCreator {
  public static create(): UserAuthLastName {
    return new UserAuthLastName(this.random().name.lastName());
  }
}
