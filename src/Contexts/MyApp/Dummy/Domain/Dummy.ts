export class Dummy {
    constructor(private readonly _id: string, private readonly _title: string,
        private readonly _content: string) {

    }

    public static create(id: string, title: string, content: string): Dummy {
        return new Dummy(id, title, content);
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }
}