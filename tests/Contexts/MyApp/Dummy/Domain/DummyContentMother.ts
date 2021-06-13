import { DummyContent } from '../../../../../src/Contexts/MyApp/Dummy';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class DummyContentMother {
  public static create(): DummyContent {
    const content = MotherCreator.random().lorem.lines(5);
    return new DummyContent(content);
  }
}
