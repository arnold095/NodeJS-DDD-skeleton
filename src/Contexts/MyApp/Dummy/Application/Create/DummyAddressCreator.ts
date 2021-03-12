import { inject, injectable } from 'inversify';
import { DummyRepository } from "@/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DummyAddressCreatorRequest } from "@/Contexts/MyApp/Dummy/Application/Create/DummyAddressCreatorRequest";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { DummyAddressId } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressId";
import { DummyAddressAlias } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressAlias";
import { DummyAddressStreet } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressStreet";
import { DummyAddressCity } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressCity";
import { DummyAddressPostalCode } from "@/Contexts/MyApp/DummyAddress/Domain/ValueObject/DummyAddressPostalCode";
import { DummyAddressAdder } from "@/Contexts/MyApp/Dummy/Domain/Services/DummyAddressAdder";

@injectable()
export class DummyAddressCreator {
    private dummyAddressAdder: DummyAddressAdder;

    public constructor(
        @inject('DummyRepository') private readonly repository: DummyRepository,
        @inject('EventBus') private readonly eventBus: EventBus
    ) {
        this.dummyAddressAdder = new DummyAddressAdder(this.repository);
    }

    public async run(request: DummyAddressCreatorRequest): Promise<void> {
        const id = new DummyAddressId(request.id);
        const dummyId = new DummyId(request.dummyId);
        const alias = new DummyAddressAlias(request.alias);
        const street = new DummyAddressStreet(request.street);
        const city = new DummyAddressCity(request.city);
        const postalCode = new DummyAddressPostalCode(request.postalCode);
        const country = new DummyAddressPostalCode(request.country);
        const dummy = await this.dummyAddressAdder.run(id, dummyId, alias,
            street, city, postalCode, country);
        await this.eventBus.publish(dummy.pullDomainEvents());
    }
}
