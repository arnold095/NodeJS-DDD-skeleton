import { Mail } from '@notificationsMail';

export interface MailSender {
  send(mail: Mail): Promise<void>;
}
