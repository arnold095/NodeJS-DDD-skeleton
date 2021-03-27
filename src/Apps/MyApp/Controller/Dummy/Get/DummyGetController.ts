import { inject, injectable } from "inversify";
import { Controller, Get, HttpCode, Param } from "routing-controllers";
import { DummyFinder } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinder";
import { DummyFinderRequest } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinderRequest";

@Controller('/dummy')
@injectable()
export class DummyGetController {
    public constructor(
        @inject('DummyFinder') private readonly finder: DummyFinder
    ) {
    }

    @Get('/:id')
    @HttpCode(200)
    public async run(@Param('id') id: string) {
        const request = new DummyFinderRequest(id);
        return await this.finder.run(request);//TODO: DTO Response
    }
}
