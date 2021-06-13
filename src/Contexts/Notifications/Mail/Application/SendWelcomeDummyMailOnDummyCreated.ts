import { DummyCreatedDomainEvent } from '@/src/Contexts/MyApp/Dummy/Domain/DummyCreatedDomainEvent';
import { DomainEventClass } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber';
import { inject, injectable } from 'inversify';
import { MailAddress } from '../Domain/ValueObject/MailAddress';
import { MailBody } from '../Domain/ValueObject/MailBody';
import { MailSubject } from '../Domain/ValueObject/MailSubject';
import { SendWelcomeDummyMail } from './SendWelcomeDummyMail';

@injectable()
export class SendWelcomeDummyMailOnDummyCreated implements DomainEventSubscriber {
  constructor(
    @inject('SendWelcomeDummyMail') private readonly sendMail: SendWelcomeDummyMail
  ) {}

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
