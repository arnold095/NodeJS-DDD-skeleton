import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/DummyCreator";
import { DummyCreatorRequest } from "@/Contexts/MyApp/Dummy/Application/DummyCreatorRequest";
import { inject, injectable } from "inversify";
import { Body, Controller, Post } from "routing-controllers";

@injectable()
@Controller('/dummy')
export class DummyPostController {
    constructor(
        @inject('DummyCreator') private dummyCreator: DummyCreator
    ) {
        
    }

    @Post('/save')
    public async run(@Body() request: DummyCreatorRequest ) {
        await this.dummyCreator.run(request);
    }
}