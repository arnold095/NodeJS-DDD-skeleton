import { DummyCreatorRequest } from "../../../../../../src/Contexts/MyApp/Dummy/Application/Create/DummyCreatorRequest";
import { DummyIdMother } from "../../Domain/DummyIdMother";
import { DummyTitleMother } from "../../Domain/DummyTitleMother";
import { DummyContentMother } from "../../Domain/DummyContentMother";
import { DummyEmailMother } from "../../Domain/DummyEmailMother";
import { DummyId } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DummyTitle } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";
import { DummyContent } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyContent";
import { DummyEmail } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyEmail";

export class DummyCreatorRequestMother {
    public static create(id?:DummyId, title?: DummyTitle,
                         content?: DummyContent, email?: DummyEmail) {
        return new DummyCreatorRequest(
           id?.value ?? DummyIdMother.create().value,
           title?.value ?? DummyTitleMother.create().value,
           content?.value ?? DummyContentMother.create().value,
           email?.value ?? DummyEmailMother.create().value
        );
    }
}
