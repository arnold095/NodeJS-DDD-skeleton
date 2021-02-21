import { DummyCreatedDomainEvent } from "@/Contexts/MyApp/Dummy/Domain/DummyCreatedDomainEvent";
import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { eventSubscriber } from "@/Contexts/Shared/Domain/Decorators/EventSubscriber";
import { inject, injectable } from "inversify";
import { MailAddress } from "../Domain/ValueObject/MailAddress";
import { MailBody } from "../Domain/ValueObject/MailBody";
import { MailSubject } from "../Domain/ValueObject/MailSubject";
import { SendWelcomeDummyMail } from "./SendWelcomeDummyMail";

@injectable()
@eventSubscriber()
export class SendWelcomeDummyMailOnDummyCreated implements DomainEventSubscriber<DummyCreatedDomainEvent>{
    constructor(
        @inject('SendWelcomeDummyMail') private readonly sendMail: SendWelcomeDummyMail
    ) {

    }

    subscribedTo(): DomainEvent[] {
        // @ts-ignore
        return [DummyCreatedDomainEvent];
    }

    public async on(domainEvent: DummyCreatedDomainEvent): Promise<void> {
        const email = new MailAddress(domainEvent.email);
        const subject = new MailSubject(domainEvent.title);
        const body = new MailBody(domainEvent.content);
        await this.sendMail.run(email, subject, body);
    }

}