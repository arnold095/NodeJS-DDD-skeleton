import { ContainerTypes } from '@/Apps/MyApp/DependencyContainer/ContainerTypes';
import { SendWelcomeUserMailOnUserRegistered } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMailOnUserRegistered";
import { NodeMailer } from "@/Contexts/Notifications/Mail/Infrastructure/NodeMailer";
import { SendWelcomeDummyMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeDummyMail";
import { SendWelcomeUserMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMail";

export class NotificationsContainer {

    public static getContainer(): ContainerTypes {
        return {
            services: [
                SendWelcomeUserMail
            ],
            domainEventSubscribers: [
                SendWelcomeUserMailOnUserRegistered
            ],
            repositories: [
                {
                    abstract: 'MailSender',
                    concrete: NodeMailer
                }
            ]
        };
    }
}
