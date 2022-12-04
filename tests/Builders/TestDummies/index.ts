import { DummyBuilder } from './DummyBuilder';

export class TestDummies {
  public static aDummy(): DummyBuilder {
    return new DummyBuilder();
  }
}
