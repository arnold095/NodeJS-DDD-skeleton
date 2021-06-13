import { inject, injectable } from 'inversify';
import { Mail } from '../Domain/Mail';
import { MailSender } from '../Domain/MailSender';
import { MailAddress } from '../Domain/ValueObject/MailAddress';
import { MailBody } from '../Domain/ValueObject/MailBody';
import { MailSubject } from '../Domain/ValueObject/MailSubject';

@injectable()
export class SendWelcomeDummyMail {
  private emailFrom: MailAddress;

  public constructor(@inject('MailSender') private readonly mailSender: MailSender) {
    this.emailFrom = new MailAddress(process.env.MAIL_WELCOME_DUMMY);
  }

  public async run(
    email: MailAddress,
    subject: MailSubject,
    body: MailBody
  ): Promise<void> {
    const mail = Mail.create(email, this.emailFrom, subject, body);
    await this.mailSender.send(mail);
  }
}
