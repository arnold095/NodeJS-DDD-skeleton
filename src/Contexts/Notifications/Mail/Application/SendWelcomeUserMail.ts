import { inject, injectable } from 'inversify';
import { Mail, MailAddress, MailBody, MailSender, MailSubject } from '@notificationsMail';

@injectable()
export class SendWelcomeUserMail {
  private readonly emailFrom = process.env.MAIL_WELCOME_DUMMY ?? 'test@test.test';
  public constructor(@inject('MailSender') private readonly mailSender: MailSender) {}

  public async run(
    email: MailAddress,
    subject: MailSubject,
    body: MailBody
  ): Promise<void> {
    const mail = Mail.create(email, new MailAddress(this.emailFrom), subject, body);
    await this.mailSender.send(mail);
  }
}
