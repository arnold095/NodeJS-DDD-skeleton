import { MotherCreator } from './MotherCreator';

export class IntegerMother {
  static random({ min, max}): number {
    return MotherCreator.random().random.number({ min, max});
  }
}
