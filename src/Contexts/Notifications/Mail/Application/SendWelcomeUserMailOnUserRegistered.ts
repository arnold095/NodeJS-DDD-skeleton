import { injectable, inject } from 'inversify';
import { domainEvent } from '@/Contexts/Shared/Domain/Decorators/DomainEvent';
import { DomainEventSubscriber } from '@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber';
import { DomainEvent } from '@/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { SendWelcomeUserMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMail";
import { UserRegisteredDomainEvent } from "@/Contexts/Auth/Authentication/Domain/UserRegisteredDomainEvent";
import { MailAddress } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailAddress";
import { Mail } from "@/Contexts/Notifications/Mail/Domain/Mail";
import { MailSubject } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailSubject";
import { MailBody } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailBody";

@injectable()
export class SendWelcomeUserMailOnUserRegistered implements DomainEventSubscriber{
    private emailFrom: MailAddress;

    public constructor(
        @inject('SendWelcomeUserMail') private readonly sendMail: SendWelcomeUserMail
    ) {
        this.emailFrom = new MailAddress(process.env.MAIL_WELCOME_DUMMY);
    }

    public subscribedTo(): DomainEvent[] {
        // @ts-ignore
        return [UserRegisteredDomainEvent]
    }

    public async on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
        const email = new MailAddress(domainEvent.email);
        const subject = new MailSubject(`Welcome ${domainEvent.firstName} ${domainEvent.lastName}`);
        const body = new MailBody(`Welcome: ${JSON.stringify(domainEvent.toPrimitives())}`);
        await this.sendMail.run(email, subject, body);
    }
}
