import { DummyId } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DummyTitle } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { DummyContent } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyEmail } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";
import { Dummy } from "../../../../../src/Contexts/MyApp/Dummy/Domain/Dummy";
import { DummyIdMother } from "./DummyIdMother";
import { DummyTitleMother } from "./DummyTitleMother";
import { DummyContentMother } from "./DummyContentMother";
import { DummyEmailMother } from "./DummyEmailMother";

export class DummyMother {
    public static create(id?: DummyId, title?: DummyTitle,
                         content?: DummyContent, email?: DummyEmail): Dummy {
        return new Dummy(
            id ?? DummyIdMother.create(),
            title ?? DummyTitleMother.create(),
            content ?? DummyContentMother.create(),
            email ?? DummyEmailMother.create()
        );
    }
}
