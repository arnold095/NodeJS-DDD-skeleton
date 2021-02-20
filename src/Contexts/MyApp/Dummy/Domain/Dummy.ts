import { DummyContent } from "./ValueObject/DummyContent";
import { DummyId } from "./ValueObject/DummyId";
import { DummyTitle } from "./ValueObject/DummyTitle";

export class Dummy {
    constructor(private readonly _id: DummyId, private readonly _title: DummyTitle,
        private readonly _content: DummyContent) {

    }

    public static create(id: DummyId, title: DummyTitle, content: DummyContent): Dummy {
        return new Dummy(id, title, content);
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