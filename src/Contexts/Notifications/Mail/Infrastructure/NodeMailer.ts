import { createTransport, createTestAccount } from 'nodemailer';
import { injectable } from 'inversify';
import { MailSender, Mail } from '@notificationsMail';

@injectable()
export class NodeMailer implements MailSender {
  public async send(mail: Mail): Promise<void> {
    const credentials = await this.credentials();
    const transporter = createTransport(credentials);
    await transporter.sendMail({
      from: mail.from.value,
      to: mail.to.value,
      subject: mail.subject.value,
      text: mail.body.value,
    });
  }

  private async credentials() {
    let auth = this.prodCredentials();
    if (process.env.mode !== 'PROD') {
      auth = await this.devCredentials();
    }
    return {
      host: process.env.NODE_MAILER_HOST,
      port: parseInt(process.env.NODE_MAILER_PORT ?? '587'),
      secure: process.env.NODE_MAILER_SECURE === 'true',
      auth,
    };
  }

  private prodCredentials() {
    return {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASSWORD,
    };
  }

  private async devCredentials() {
    const testAccount = await createTestAccount();
    return {
      user: testAccount.user,
      pass: testAccount.pass,
    };
  }
}
