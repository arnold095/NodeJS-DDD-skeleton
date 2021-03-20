import { injectable, inject } from 'inversify';
import { domainEvent } from '@/Contexts/Shared/Domain/Decorators/DomainEvent';
import { DomainEventSubscriber } from '@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber';
import { DomainEvent } from '@/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { SendWelcomeUserMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMail";
import { UserRegisteredDomainEvent } from "@/Contexts/Auth/Domain/UserRegisteredDomainEvent";

@domainEvent()
@injectable()
export class SendWelcomeUserMailOnUserRegistered implements DomainEventSubscriber{
    public constructor(
        @inject('SendWelcomeUserMail') private readonly sendMail: SendWelcomeUserMail
    ) {
    }

    public subscribedTo(): DomainEvent[] {
        // @ts-ignore
        return [UserRegisteredDomainEvent]
    }

    public async on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
        // const dto = ...
        // await this.sendMail.run(dto);
    }
}
