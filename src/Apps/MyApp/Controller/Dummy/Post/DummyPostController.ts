import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyCreator";
import { DummyCreatorRequest } from "@/Contexts/MyApp/Dummy/Application/Create/DummyCreatorRequest";
import { inject, injectable } from "inversify";
import { Body, Controller, OnUndefined, Post } from "routing-controllers";

@injectable()
@Controller('/dummy')
export class DummyPostController {
    constructor(
        @inject('DummyCreator') private dummyCreator: DummyCreator
    ) {
    }

    @Post('/save')
    @OnUndefined(202)
    public async run(@Body() request: DummyCreatorRequest) {
        await this.dummyCreator.run(request);
    }
}
