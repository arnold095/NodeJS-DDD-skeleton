import { inject, injectable } from 'inversify';
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { UserAuthRepository } from "@/Contexts/Auth/Domain/UserAuthRepository";
import { UserRegisterRequest } from "@/Contexts/Auth/Application/UserRegisterRequest";
import { UserAuthId } from "@/Contexts/Auth/Domain/ValueObject/UserAuthId";
import { UserAlreadyExists } from "@/Contexts/Auth/Domain/Exception/UserAlreadyExists";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";

@injectable()
export class UserRegister {
    public constructor(
        @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
        @inject('EventBus') private readonly bus: EventBus
    ) {

    }

    public async run(request: UserRegisterRequest): Promise<void> {
        const userId = new UserAuthId(request.id);
        const userEmail = new UserAuthEmail(request.email);
        await this.ensureUserDoesNotExist(userEmail);
        // await this.bus.publish(aggregate.pullDomainEvents());
    }

    private async ensureUserDoesNotExist(email: UserAuthEmail) {
        await this.ensureEmailDoesNotExist(email);
    }

    private async ensureEmailDoesNotExist(email: UserAuthEmail) {
        const user = await this.repository.find(email);
        if (undefined !== user) {
            throw new UserAlreadyExists(`The email ${email.value} already exists`);
        }
    }
}
