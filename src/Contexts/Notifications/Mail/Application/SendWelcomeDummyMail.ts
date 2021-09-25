import { Mail, MailAddress, MailBody, MailSender, MailSubject } from '@notificationsMail';

export class SendWelcomeDummyMail {
  private emailFrom = process.env.MAIL_WELCOME_DUMMY ?? 'test@test.test';

  public constructor(private readonly mailSender: MailSender) {}

  public async run(
    email: MailAddress,
    subject: MailSubject,
    body: MailBody
  ): Promise<void> {
    const mail = Mail.create(email, new MailAddress(this.emailFrom), subject, body);
    await this.mailSender.send(mail);
  }
}
