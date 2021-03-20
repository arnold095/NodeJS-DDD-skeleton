import { DomainEvent } from '@/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { domainEvent } from "@/Contexts/Shared/Domain/Decorators/DomainEvent";

@domainEvent()
export class UserRegisteredDomainEvent extends DomainEvent {
    private static readonly _eventName = 'user.registered';

    public constructor(private _id) {
        super(_id, UserRegisteredDomainEvent.eventName)
    }

    public static get eventName(): string {
        return this._eventName;
    }

    public toPrimitives(): {} {
        return {};
    }
}
