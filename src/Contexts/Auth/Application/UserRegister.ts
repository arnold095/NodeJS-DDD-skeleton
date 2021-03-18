import { inject, injectable } from 'inversify';
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { UserAuthRepository } from "@/Contexts/Auth/Domain/UserAuthRepository";

@injectable()
export class UserRegister {
    public constructor(
        @inject('UserAuthRepository') private readonly repository: UserAuthRepository,
        @inject('EventBus') private readonly bus: EventBus
    ) {

    }

    public async run(params: any): Promise<void> {
        await this.repository.find()
        // await this.bus.publish(aggregate.pullDomainEvents());
    }
}
