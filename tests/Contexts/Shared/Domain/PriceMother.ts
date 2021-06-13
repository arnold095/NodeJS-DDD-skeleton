import { MotherCreator } from './MotherCreator';

export class PriceMother {
  static create(): number {
    return parseFloat(MotherCreator.random().commerce.price());
  }
}
