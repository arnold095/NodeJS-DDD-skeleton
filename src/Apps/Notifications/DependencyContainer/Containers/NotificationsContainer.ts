import { SendWelcomeDummyMail } from '@/src/Contexts/Notifications/Mail/Application/SendWelcomeDummyMail';
import { SendWelcomeDummyMailOnDummyCreated } from '@/src/Contexts/Notifications/Mail/Application/SendWelcomeDummyMailOnDummyCreated';
import { NodeMailer } from '@/src/Contexts/Notifications/Mail/Infrastructure/NodeMailer';
import { SendWelcomeUserMailOnUserRegistered } from '@/src/Contexts/Notifications/Mail/Application/SendWelcomeUserMailOnUserRegistered';
import { SendWelcomeUserMail } from '@/src/Contexts/Notifications/Mail/Application/SendWelcomeUserMail';
import { AdapterTypes } from '@/src/Contexts/Shared/Domain/Server/AdapterTypes';

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
