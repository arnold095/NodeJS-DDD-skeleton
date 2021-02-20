import { inject, injectable } from "inversify";
import { DummyRepository } from "../Domain/DummyRepository";
@injectable()
export class DummyCreator {
    constructor(
        @inject('DummyRepository') private repository: DummyRepository
    ) {
        console.log('aa');

    }

    public async run() {
    }
}