import { DomainEventClass, DomainEventSubscriber } from '@sharedDomain';
import { SendWelcomeDummyMail } from './SendWelcomeDummyMail';
import { DummyCreatedDomainEvent } from '@dummy';
import { MailAddress } from '../Domain/ValueObject/MailAddress';
import { MailSubject } from '../Domain/ValueObject/MailSubject';
import { MailBody } from '../Domain/ValueObject/MailBody';

export class SendWelcomeDummyMailOnDummyCreated implements DomainEventSubscriber {
  constructor(private readonly sendMail: SendWelcomeDummyMail) {}

  subscribedTo(): DomainEventClass[] {
    return [DummyCreatedDomainEvent];
  }

  public async on(domainEvent: DummyCreatedDomainEvent): Promise<void> {
    const email = new MailAddress(domainEvent.email);
    const subject = new MailSubject(domainEvent.title);
    const body = new MailBody(domainEvent.content);
    await this.sendMail.run(email, subject, body);
  }
}
