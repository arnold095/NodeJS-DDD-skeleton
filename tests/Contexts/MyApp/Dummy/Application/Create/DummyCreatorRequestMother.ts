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
} from '@dummy';
import { plainToClass } from 'class-transformer';

export class DummyCreatorRequestMother {
  public static create(
    id?: DummyId,
    title?: DummyTitle,
    content?: DummyContent,
    email?: DummyEmail
  ): DummyCreatorRequest {
    return plainToClass(DummyCreatorRequest, {
      id: id?.value ?? DummyIdMother.create().value,
      title: title?.value ?? DummyTitleMother.create().value,
      content: content?.value ?? DummyContentMother.create().value,
      email: email?.value ?? DummyEmailMother.create().value,
    });
  }
}
