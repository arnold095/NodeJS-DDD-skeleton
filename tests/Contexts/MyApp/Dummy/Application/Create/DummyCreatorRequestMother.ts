import { DummyIdMother } from '../../Domain/DummyIdMother';
import { DummyTitleMother } from '../../Domain/DummyTitleMother';
import { DummyContentMother } from '../../Domain/DummyContentMother';
import { DummyEmailMother } from '../../Domain/DummyEmailMother';
import {
  DummyContent,
  DummyCreatorRequest,
  DummyEmail,
  DummyId,
  DummyTitle,
} from '../../../../../../src/Contexts/MyApp/Dummy';

export class DummyCreatorRequestMother {
  public static create(
    id?: DummyId,
    title?: DummyTitle,
    content?: DummyContent,
    email?: DummyEmail
  ): DummyCreatorRequest {
    return new DummyCreatorRequest(
      id?.value ?? DummyIdMother.create().value,
      title?.value ?? DummyTitleMother.create().value,
      content?.value ?? DummyContentMother.create().value,
      email?.value ?? DummyEmailMother.create().value
    );
  }
}
