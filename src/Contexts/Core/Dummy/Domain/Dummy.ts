import { AggregateRoot, Primitives } from '../../../Shared/Domain';
import { PropertiesOf } from '../../../Shared/Domain/Utils/PropertiesOf';
import { DummyId } from './DummyId';
import { DummyName } from './DummyName';
import { DummyCreatedDomainEvent } from './Events/DummyCreatedDomainEvent';

type Args = PropertiesOf<Dummy>;
export type DummyPrimitives = Primitives<Dummy>;

export class Dummy extends AggregateRoot {
  private readonly _id: DummyId;
  private readonly _name: DummyName;
  public constructor(args: Args) {
    super();
    this._id = args.id;
    this._name = args.name;
  }

  get id(): DummyId {
    return this._id;
  }

  get name(): DummyName {
    return this._name;
  }

  public static create(args: Args): Dummy {
    const dummy = new Dummy(args);

    dummy.record(DummyCreatedDomainEvent.of(dummy.toPrimitives()));

    return dummy;
  }

  public toPrimitives(): DummyPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
