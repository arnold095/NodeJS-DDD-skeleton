import { inject, injectable } from 'inversify';
import { Mail, MailAddress, MailBody, MailSender, MailSubject } from '@notificationsMail';

@injectable()
export class SendWelcomeUserMail {
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
