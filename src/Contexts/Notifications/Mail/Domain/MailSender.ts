import { Mail } from "./Mail";

export interface MailSender {
    send(mail: Mail): Promise<void>;
}
