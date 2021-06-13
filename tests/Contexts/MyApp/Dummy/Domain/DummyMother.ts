import { DummyIdMother } from './DummyIdMother';
import { DummyTitleMother } from './DummyTitleMother';
import { DummyContentMother } from './DummyContentMother';
import { DummyEmailMother } from './DummyEmailMother';
import {
  Dummy,
  DummyContent,
  DummyEmail,
  DummyId,
  DummyTitle,
} from '../../../../../src/Contexts/MyApp/Dummy';

export class DummyMother {
  public static create(
    id?: DummyId,
    title?: DummyTitle,
    content?: DummyContent,
    email?: DummyEmail
  ): Dummy {
    return new Dummy(
      id ?? DummyIdMother.create(),
      title ?? DummyTitleMother.create(),
      content ?? DummyContentMother.create(),
      email ?? DummyEmailMother.create()
    );
  }
}
