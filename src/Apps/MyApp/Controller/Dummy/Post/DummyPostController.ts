import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/DummyCreator";
import { inject, injectable } from "inversify";

@injectable()
export class DummyPostController {
    constructor(
        private dummyCreator: DummyCreator
    ) {

    }

    public async run() {
        await this.dummyCreator.run();
    }
}