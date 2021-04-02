import 'module-alias/register';
import * as map from 'source-map-support';
import "reflect-metadata";
import { RabbitMQDomainEventsConsumer } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQDomainEventsConsumer";
import { DomainEventSubscriberLocator } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventSubscriberLocator";
import { InversifyAdapter } from "@/Apps/Notifications/DependencyContainer/InversifyAdapter";
import { RabbitMQConfigurator } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurator";

map.install();

export class ConsumeRabbitMQDomainEventsCommand {
    private exchangeName: string = process.env.RABBITMQ_EXCHANGE;
    private readonly consumer: RabbitMQDomainEventsConsumer;
    private readonly configurator: RabbitMQConfigurator;
    private readonly locator: DomainEventSubscriberLocator;
    private readonly container: InversifyAdapter;

    constructor() {
        this.container = new InversifyAdapter();
        this.configurator = this.container.getClass('RabbitMQConfigurator');
        this.consumer = this.container.getClass('RabbitMQDomainEventsConsumer');
        this.locator = this.container.getClass('DomainEventSubscriberLocator');
    }

    public async run() {
        const queueName = this.queue();
        await this.configurator.configure(this.exchangeName);
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
            throw new Error(`This queue does not exist ${queue}`);
        }
        return queue;
    }
}

const command = new ConsumeRabbitMQDomainEventsCommand();
command.run();
