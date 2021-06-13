import { MotherCreator } from './MotherCreator';

export class FloatMother {
  static random({ max, min, precision }): number {
    return MotherCreator.random().datatype.float({ max, min, precision });
  }
}
