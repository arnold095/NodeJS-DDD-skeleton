import { inject, injectable } from 'inversify';
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { UserAuthRepository } from "@/Contexts/Auth/Domain/UserAuthRepository";
import { UserRegisterRequest } from "@/Contexts/Auth/Application/UserRegisterRequest";
import { UserAuthId } from "@/Contexts/Auth/Domain/ValueObject/UserAuthId";
import { UserAlreadyExists } from "@/Contexts/Auth/Domain/Exception/UserAlreadyExists";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";
import { UserAuthFirstName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthFirstName";
import { UserAuthLastName } from "@/Contexts/Auth/Domain/ValueObject/UserAuthLastName";
import { UserAuthPassword } from "@/Contexts/Auth/Domain/ValueObject/UserAuthPassword";
import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";

@injectable()
export class UserRegister {
    public constructor(
        @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
        @inject('EventBus') private readonly bus: EventBus
    ) {

    }

    public async run(request: UserRegisterRequest): Promise<void> {
        const id = new UserAuthId(request.id);
        const email = new UserAuthEmail(request.email);
        await this.ensureUserDoesNotExist(email);
        const firstName = new UserAuthFirstName(request.firstName);
        const lastName = new UserAuthLastName(request.lastName);
        const password = await this.processAndHashPassword(request.password);
        const user = UserAuth.register(id, firstName, lastName, email, password);
        await this.repository.save(user);
        await this.bus.publish(user.pullDomainEvents());
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

    private async processAndHashPassword(passwordRequest: string) {
        const password = new UserAuthPassword(passwordRequest);
        const hashedPassword = await password.hashValue();
        return new UserAuthPassword(hashedPassword);
    }
}
