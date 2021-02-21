import { AggregateRoot } from "@/Contexts/Shared/Domain/Aggregate/AggregateRoot";
import { DummyCreatedDomainEvent } from "./DummyCreatedDomainEvent";
import { DummyContent } from "./ValueObject/DummyContent";
import { DummyEmail } from "./ValueObject/DummyEmail";
import { DummyId } from "./ValueObject/DummyId";
import { DummyTitle } from "./ValueObject/DummyTitle";

export class Dummy extends AggregateRoot {
    constructor(private readonly _id: DummyId, private readonly _title: DummyTitle,
        private readonly _content: DummyContent, private readonly _email: DummyEmail) {
        super();
    }

    public static create(id: DummyId, title: DummyTitle, 
        content: DummyContent, email: DummyEmail): Dummy {
        const dummy = new Dummy(id, title, content, email);
        dummy.record(new DummyCreatedDomainEvent(
            id.value, title.value, content.value,
            email.value
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

    public get email(): DummyEmail {
        return this._email;
    }
}