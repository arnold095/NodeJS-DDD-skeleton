import { inject, injectable } from "inversify";
import { DummyRepository } from "../Domain/DummyRepository";
import { DummyCreatorRequest } from "./DummyCreatorRequest";
@injectable()
export class DummyCreator {
    constructor(
        @inject('DummyRepository') private repository: DummyRepository
    ) {
    }

    public async run(request: DummyCreatorRequest) {
        console.log(request);
    }
}