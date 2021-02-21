export class DummyCreatorRequest {
    constructor(public readonly id: string, public readonly title: string,
        public readonly content: string, public readonly email: string) {
    }
}