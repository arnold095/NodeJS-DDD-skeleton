import { UuidMother } from '../../../Shared/Domain/UuidMother';
import { DummyId } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";

export class DummyIdMother extends UuidMother {
    static create(): DummyId {
        return new DummyId(this.random());
    }
}
