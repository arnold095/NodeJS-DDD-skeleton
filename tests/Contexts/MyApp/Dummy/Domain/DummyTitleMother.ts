import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { DummyTitle } from "../../../../../src/Contexts/MyApp/Dummy/Domain/ValueObject/DummyTitle";

export class DummyTitleMother extends MotherCreator {
    public static create(): DummyTitle {
        return new DummyTitle(this.random().lorem.sentence(5));
    }
}
