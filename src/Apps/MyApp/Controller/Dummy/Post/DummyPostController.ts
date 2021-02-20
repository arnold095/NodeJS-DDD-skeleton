import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/DummyCreator";
import { inject, injectable } from "inversify";
import { Controller, Post } from "routing-controllers";

@injectable()
@Controller('/dummy')
export class DummyPostController {
    constructor(
        @inject('DummyCreator') private dummyCreator: DummyCreator
    ) {
        
    }

    @Post('/save')
    public async run() {
        await this.dummyCreator.run();
    }
}