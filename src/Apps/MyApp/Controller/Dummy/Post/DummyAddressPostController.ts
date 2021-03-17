import { inject, injectable } from 'inversify';
import { Body, Controller, Post } from "routing-controllers";
import { DummyAddressCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyAddressCreator";
import { DummyAddressCreatorRequest } from "@/Contexts/MyApp/Dummy/Application/Create/DummyAddressCreatorRequest";

@injectable()
@Controller('/dummy/address')
export class DummyAddressPostController {
    public constructor(
        @inject('DummyAddressCreator') private readonly addressCreator: DummyAddressCreator
    ) {
    }

    @Post('/save')
    public async run(@Body() request: DummyAddressCreatorRequest) {
        await this.addressCreator.run(request);
    }
}
