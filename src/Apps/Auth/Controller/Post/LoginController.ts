import { inject, injectable } from 'inversify';
import { Body, Controller, Post } from "routing-controllers";
import { UserLogin } from "@/Contexts/Auth/Authentication/Application/UserLogin";
import { UserLoginRequest } from "@/Contexts/Auth/Authentication/Application/UserLoginRequest";

@injectable()
@Controller('/auth')
export class LoginController {
    public constructor(
        @inject('UserLogin') private readonly userLogin: UserLogin
    ) {
    }

    @Post('/login')
    public async run(@Body() request: UserLoginRequest) {
        return await this.userLogin.run(request);
    }
}
