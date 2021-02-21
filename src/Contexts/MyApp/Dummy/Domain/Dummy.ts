import { AggregateRoot } from "@/Contexts/Shared/Domain/Aggregate/AggregateRoot";
import { DummyCreatedDomainEvent } from "./DummyCreatedDomainEvent";
import { DummyContent } from "./ValueObject/DummyContent";
import { DummyId } from "./ValueObject/DummyId";
import { DummyTitle } from "./ValueObject/DummyTitle";

export class Dummy extends AggregateRoot {
    constructor(private readonly _id: DummyId, private readonly _title: DummyTitle,
        private readonly _content: DummyContent) {
        super();
    }

    public static create(id: DummyId, title: DummyTitle, content: DummyContent): Dummy {
        const dummy = new Dummy(id, title, content);
        dummy.record(new DummyCreatedDomainEvent(
            id.value, title.value, content.value
        ));
        return dummy;
    }

    public get id(): DummyId {
        return this._id;
    }

    public get title(): DummyTitle {
        return this._title;
    }

    public get content(): DummyContent {
        return this._content;
    }
}