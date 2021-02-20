export class BooleanValueObject {
    constructor(private _value: boolean) { }

    public get value(): boolean {
        return this._value;
    }
}