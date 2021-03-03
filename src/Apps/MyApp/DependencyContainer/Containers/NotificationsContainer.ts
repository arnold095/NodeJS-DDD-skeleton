import { SendWelcomeDummyMail } from "@/Contexts/Notifications/Mail/Application/SendWelcomeDummyMail";
import { SendWelcomeDummyMailOnDummyCreated } from "@/Contexts/Notifications/Mail/Application/SendWelcomeDummyMailOnDummyCreated";
import { NodeMailer } from "@/Contexts/Notifications/Mail/Infrastructure/NodeMailer";
import { ContainerTypes } from "../ContainerTypes";

export class NotificationsContainer {
    public static getContainer(): ContainerTypes {
        return {
            services: [
                SendWelcomeDummyMail
            ],
            domainEventSubscribers: [
                SendWelcomeDummyMailOnDummyCreated,
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
