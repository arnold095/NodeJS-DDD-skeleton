import { inject, injectable } from 'inversify';

@injectable()
export class SendWelcomeUserMail {
    public constructor(
        // @inject('Repository') private readonly repository
        // @inject('EventBus') private readonly bus: EventBus
    ) {
    }

    public async run(params: any): Promise<void> {
        // await this.repository.find()
        // await this.bus.publish(aggregate.pullDomainEvents());
    }
}
