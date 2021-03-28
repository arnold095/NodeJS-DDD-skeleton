import { SendWelcomeDummyMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeDummyMail";
import { SendWelcomeDummyMailOnDummyCreated } from "@/Contexts/Notifications/Mail/Application/SendWelcomeDummyMailOnDummyCreated";
import { NodeMailer } from "@/Contexts/Notifications/Mail/Infrastructure/NodeMailer";
import { ContainerTypes } from "../ContainerTypes";
import { SendWelcomeUserMailOnUserRegistered } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMailOnUserRegistered";
import { SendWelcomeUserMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeUserMail";

export class NotificationsContainer {
    public static container(): ContainerTypes {
        return {
            services: [
                SendWelcomeDummyMail,
                SendWelcomeUserMail
            ],
            domainEventSubscribers: [
                SendWelcomeDummyMailOnDummyCreated,
                SendWelcomeUserMailOnUserRegistered
            ],
            repositories: [
                {
                    abstract: 'MailSender',
                    concrete: NodeMailer
                }
            ]
        }
    }
}
