import { inject, injectable } from 'inversify';
import { Body, Controller, HttpCode, Post } from "routing-controllers";
import { UserRegister } from "@/Contexts/Auth/Authentication/Application/UserRegister";
import { UserRegisterRequest } from "@/Contexts/Auth/Authentication/Application/UserRegisterRequest";

@injectable()
@Controller('/auth')
export class RegisterController {
    public constructor(
        @inject('UserRegister') private readonly userRegister: UserRegister
    ) {
    }

    @Post('/register')
    @HttpCode(201)
    public async run(@Body() request: UserRegisterRequest) {
        return await this.userRegister.run(request);
    }
}
