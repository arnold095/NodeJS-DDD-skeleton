import { Dummy } from '../../../src/Contexts/Core/Dummy/Domain/Dummy';
import { DummyId } from '../../../src/Contexts/Core/Dummy/Domain/DummyId';
import { DummyName } from '../../../src/Contexts/Core/Dummy/Domain/DummyName';
import { StringMother } from '../../ObjectMother';

export class DummyBuilder {
  private id: string | undefined;
  private name: string | undefined;

  public withId(id: string): DummyBuilder {
    this.id = id;
    return this;
  }

  public withName(name: string): DummyBuilder {
    this.name = name;
    return this;
  }

  public build(): Dummy {
    return new Dummy({
      id: this.id ? new DummyId(this.id) : DummyId.random(),
      name: new DummyName(this.name ?? StringMother.random({ length: 10 })),
    });
  }
}
