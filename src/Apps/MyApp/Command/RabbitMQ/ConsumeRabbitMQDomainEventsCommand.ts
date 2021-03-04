import 'module-alias/register';
import * as map from 'source-map-support';
import "reflect-metadata";
import { RabbitMQDomainEventsConsumer } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventsConsumer";
import { DomainEventSubscriberLocator } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventSubscriberLocator";
import { InversifyAdapter } from "@/Apps/MyApp/DependencyContainer/InversifyAdapter";

map.install();

export class ConsumeRabbitMQDomainEventsCommand {
    private readonly consumer: RabbitMQDomainEventsConsumer;
    private readonly locator: DomainEventSubscriberLocator;
    private readonly container: InversifyAdapter;

    constructor() {
        this.container = new InversifyAdapter();
        this.consumer = this.container.getClass('RabbitMQDomainEventsConsumer');
        this.locator = this.container.getClass('DomainEventSubscriberLocator');
    }

    public async run() {
        const queueName = this.queue();
        const subscriber = this.locator.withRabbitMQQueueNamed(queueName);
        await this.consumer.consume(subscriber, queueName);
    }

    private queue(): string {
        let queue = '';
        process.argv.map(arg => {
            if (arg.includes('queue')) {
                queue = arg.replace('queue:', '');
            }
        });
        if (queue === '') {
            throw new Error('This queue does not exist');
        }
        return queue;
    }
}

const command = new ConsumeRabbitMQDomainEventsCommand();
command.run();
