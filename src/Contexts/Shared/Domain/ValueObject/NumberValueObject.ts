export class NumberValueObject {
    public constructor(private _value: number) { }

    public lessThan(other: number) {
        return this.value < other;
    }

    public isBiggerThan(other: number) {
        return this.value > other;
    }

    public get value(): number {
        return this._value;
    }
}