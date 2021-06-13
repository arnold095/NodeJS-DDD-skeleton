import { injectable, inject } from 'inversify';
import { DomainEventClass, DomainEventSubscriber } from '@sharedDomain';
import { UserRegisteredDomainEvent } from '@authentication';
import {
  MailAddress,
  SendWelcomeUserMail,
  MailSubject,
  MailBody,
} from '@notificationsMail';

@injectable()
export class SendWelcomeUserMailOnUserRegistered implements DomainEventSubscriber {
  public constructor(
    @inject('SendWelcomeUserMail') private readonly sendMail: SendWelcomeUserMail
  ) {}

  public subscribedTo(): DomainEventClass[] {
    return [UserRegisteredDomainEvent];
  }

  public async on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
    const email = new MailAddress(domainEvent.email);
    const subject = new MailSubject(
      `Welcome ${domainEvent.firstName} ${domainEvent.lastName}`
    );
    const body = new MailBody(`Welcome: ${JSON.stringify(domainEvent.toPrimitives())}`);
    await this.sendMail.run(email, subject, body);
  }
}
