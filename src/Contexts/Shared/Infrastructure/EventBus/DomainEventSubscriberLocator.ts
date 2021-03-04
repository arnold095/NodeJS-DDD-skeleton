import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { injectable, multiInject } from "inversify";
import { RabbitMQQueueNameFormatter } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQQueueNameFormatter";

@injectable()
export class DomainEventSubscriberLocator {

    constructor(
        @multiInject('DomainEventSubscriber') private readonly domainEventSubscriber
    ) {
    }

    public withRabbitMQQueueNamed(queueName: string): DomainEventSubscriber {
        let subscriber: DomainEventSubscriber;
        this.domainEventSubscriber.map(eventSubscriber => {
            const mappedClassName = RabbitMQQueueNameFormatter.format(eventSubscriber);
            if (queueName === mappedClassName) {
                subscriber = eventSubscriber;
            }
        });
        if (undefined === subscriber) {
            throw new Error(`There are no subscribers for the <${queueName}> queue`)
        }
        return subscriber;
    }
}
