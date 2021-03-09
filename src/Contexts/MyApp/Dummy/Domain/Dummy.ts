import { AggregateRoot } from "@/Contexts/Shared/Domain/Aggregate/AggregateRoot";
import { DummyCreatedDomainEvent } from "./DummyCreatedDomainEvent";
import { DummyContent } from "./ValueObject/DummyContent";
import { DummyEmail } from "./ValueObject/DummyEmail";
import { DummyId } from "./ValueObject/DummyId";
import { DummyTitle } from "./ValueObject/DummyTitle";
import { DomainModel } from "@/Contexts/Shared/Domain/Model/DomainModel";

export class Dummy extends AggregateRoot implements DomainModel {
    constructor(private _id: DummyId, private _title: DummyTitle,
        private _content: DummyContent, private _email: DummyEmail) {
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
