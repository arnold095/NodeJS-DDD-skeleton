import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { UserAuthPassword } from '@authentication';

export class UserAuthPasswordMother extends MotherCreator {
  public static create(password?: string): UserAuthPassword {
    return new UserAuthPassword(password ?? `1. 3A${this.random().internet.password()}`);
  }
}
