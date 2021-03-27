import { inject, injectable } from 'inversify';
import { UserAuthRepository } from "@/Contexts/Auth/Authentication/Domain/UserAuthRepository";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { UserEncoder } from "@/Contexts/Auth/Authorization/Application/UserEncoder";
import { UserLoginRequest } from "@/Contexts/Auth/Authentication/Application/UserLoginRequest";
import { UserAuthEmail } from "@/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail";
import { UserAuth } from "@/Contexts/Auth/Authentication/Domain/UserAuth";
import { InvalidCredentials } from "@/Contexts/Auth/Authentication/Domain/Exception/InvalidCredentials";

@injectable()
export class UserLogin {
    public constructor(
        @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
        @inject('EventBus') private readonly bus: EventBus,
        @inject('UserEncoder') private readonly encoder: UserEncoder
    ) {
    }

    public async run(request: UserLoginRequest): Promise<string> {
        const email = new UserAuthEmail(request.email);
        const user = await this.repository.find(email);
        this.ensureThatTheUserExists(user);
        await this.ensureThatThePasswordIsCorrect(user, request.password);
        await this.bus.publish(user.pullDomainEvents());
        return this.encoder.run({
            id: user.id.value,
            name: user.firstName.value,
            lastName: user.lastName.value,
            email: user.email.value,
        });
    }

    private ensureThatTheUserExists(user: UserAuth) {
        if (undefined === user) {
            throw new InvalidCredentials('The email or password is not correct');
        }
    }

    private async ensureThatThePasswordIsCorrect(user: UserAuth, password: string) {
        const passwordComparison = await user.password.isEquals(password);
        if (!passwordComparison) {
            throw new InvalidCredentials('The email or password is not correct');
        }
    }
}
