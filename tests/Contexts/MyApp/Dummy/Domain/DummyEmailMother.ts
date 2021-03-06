import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { DummyEmail } from '../../../../../src/Contexts/MyApp/Dummy';

export class DummyEmailMother extends MotherCreator {
  public static create(): DummyEmail {
    return new DummyEmail(this.random().internet.email());
  }
}
