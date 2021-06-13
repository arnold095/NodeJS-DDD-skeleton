import { injectable, inject } from 'inversify';
import { DomainEventSubscriber } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber';
import { DomainEventClass } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { SendWelcomeUserMail } from '@/src/Contexts/Notifications/Mail/Application/SendWelcomeUserMail';
import { UserRegisteredDomainEvent } from '@/src/Contexts/Auth/Authentication/Domain/UserRegisteredDomainEvent';
import { MailAddress } from '@/src/Contexts/Notifications/Mail/Domain/ValueObject/MailAddress';
import { MailSubject } from '@/src/Contexts/Notifications/Mail/Domain/ValueObject/MailSubject';
import { MailBody } from '@/src/Contexts/Notifications/Mail/Domain/ValueObject/MailBody';

@injectable()
export class SendWelcomeUserMailOnUserRegistered implements DomainEventSubscriber {
  private emailFrom: MailAddress;

  public constructor(
    @inject('SendWelcomeUserMail') private readonly sendMail: SendWelcomeUserMail
  ) {
    this.emailFrom = new MailAddress(process.env.MAIL_WELCOME_DUMMY);
  }

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
