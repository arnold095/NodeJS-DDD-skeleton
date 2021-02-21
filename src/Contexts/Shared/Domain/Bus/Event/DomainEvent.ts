import { Uuid } from "../../ValueObject/Uuid";

export abstract class DomainEvent {
    private _eventId: string;
    private _occurredOn: Date;

    constructor(private _aggregateId: string,
        private _eventName: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        this._eventId = eventId ?? Uuid.random().value;
        this._occurredOn = occurredOn ?? new Date();
    }

    public get aggregateId(): string {
        return this._aggregateId;
    }

    public get eventId(): string {
        return this._eventId;
    }

    public get occurredOn(): Date {
        return this._occurredOn;
    }

    public get eventName(): string {
        return this._eventName;
    }

    public abstract toPrimitives(): {};
    
    public static fromPrimitives: (...args: any[]) => any;
}