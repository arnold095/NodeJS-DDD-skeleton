import { DomainEvent } from "@/Contexts/Shared/Domain/Bus/Event/DomainEvent";

export type DummyCreatedDomainEventBody = {
    readonly title: string;
    readonly content: string;
    readonly email: string;
};

export class DummyCreatedDomainEvent extends DomainEvent {
    private static readonly _eventName = 'dummy.created';

    public constructor(private readonly _id: string, private readonly _title: string,
        private readonly _content: string, private readonly _email: string,
        eventId?: string, occurredOn?: Date) {
        super(_id, DummyCreatedDomainEvent.eventName, eventId, occurredOn);
    }

    public static get eventName() {
        return DummyCreatedDomainEvent._eventName;
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get email(): string {
        return this._email;
    }

    public toPrimitives(): DummyCreatedDomainEventBody {
        return {
            title: this.title,
            content: this.content,
            email: this.email
        };
    }

    public static fromPrimitives(aggregateId: string, body: DummyCreatedDomainEventBody,
        eventId: string, occurredOn: Date): DummyCreatedDomainEvent {
        return new DummyCreatedDomainEvent(
            aggregateId,
            body.title,
            body.content,
            body.email,
            eventId,
            occurredOn
        );
    }
}