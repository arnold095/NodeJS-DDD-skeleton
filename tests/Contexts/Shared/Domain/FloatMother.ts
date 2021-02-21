import { MotherCreator } from "./MotherCreator";

export class FloatMother {
    static random({ max, min, precision }): number {
        return MotherCreator.random().random.float({ max, min, precision });
    }
}