import { AdapterTypes } from '@sharedDomain';
import {
  NodeMailer,
  SendWelcomeDummyMail,
  SendWelcomeDummyMailOnDummyCreated,
  SendWelcomeUserMail,
  SendWelcomeUserMailOnUserRegistered
} from '@notificationsMail';

export class NotificationsContainer {
  public static container(): AdapterTypes {
    return {
      services: [SendWelcomeDummyMail, SendWelcomeUserMail],
      domainEventSubscribers: [
        SendWelcomeDummyMailOnDummyCreated,
        SendWelcomeUserMailOnUserRegistered,
      ],
      domainContracts: [
        {
          abstract: 'MailSender',
          concrete: NodeMailer,
        },
      ],
    };
  }
}
