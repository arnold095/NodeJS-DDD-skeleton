import { inject, injectable } from "inversify";
import { DummyRepository } from "../Domain/DummyRepository";
@injectable()
export class DummyCreator {
    constructor(
        //private repository: DummyRepository
    ) {

    }

    public async run() {
    }
}