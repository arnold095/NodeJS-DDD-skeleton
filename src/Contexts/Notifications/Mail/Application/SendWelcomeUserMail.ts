import { inject, injectable } from 'inversify';
import { MailAddress } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailAddress";
import { MailSubject } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailSubject";
import { MailBody } from "@/Contexts/Notifications/Mail/Domain/ValueObject/MailBody";
import { MailSender } from "@/Contexts/Notifications/Mail/Domain/MailSender";
import { Mail } from "@/Contexts/Notifications/Mail/Domain/Mail";

@injectable()
export class SendWelcomeUserMail {
    private emailFrom: MailAddress;
    public constructor(
        @inject('MailSender') private readonly mailSender: MailSender
    ) {
        this.emailFrom = new MailAddress(process.env.MAIL_WELCOME_DUMMY);
    }

    public async run(email: MailAddress, subject: MailSubject, body: MailBody): Promise<void> {
        const mail = Mail.create(email, this.emailFrom, subject, body);
        await this.mailSender.send(mail);
    }
}
