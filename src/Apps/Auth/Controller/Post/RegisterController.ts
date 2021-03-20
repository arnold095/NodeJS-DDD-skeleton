import { inject, injectable } from 'inversify';
import { Body, Controller, Post } from "routing-controllers";
import { UserRegister } from "@/Contexts/Auth/Application/UserRegister";
import { UserRegisterRequest } from "@/Contexts/Auth/Application/UserRegisterRequest";

@injectable()
@Controller('/auth')
export class RegisterController {
    public constructor(
        @inject('UserRegister') private readonly userRegister: UserRegister
    ) {
    }

    @Post('/register')
    public async run(@Body() request: UserRegisterRequest) {
        await this.userRegister.run(request);
    }
}
