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
import { DummyNotFound } from "@/Contexts/MyApp/Dummy/Domain/Exception/DummyNotFound";

@injectable()
export class DummyAddressCreator {
    public constructor(
        @inject('DummyRepository') private readonly repository: DummyRepository,
        @inject('EventBus') private readonly eventBus: EventBus
    ) {
    }

    public async run(request: DummyAddressCreatorRequest): Promise<void> {
        const id = new DummyAddressId(request.id);
        const dummyId = new DummyId(request.dummyId);
        const alias = new DummyAddressAlias(request.alias);
        const street = new DummyAddressStreet(request.street);
        const city = new DummyAddressCity(request.city);
        const postalCode = new DummyAddressPostalCode(request.postalCode);
        const country = new DummyAddressPostalCode(request.country);
        const dummy = await this.repository.find(dummyId);
        this.ensureDummyExists(dummy);
        // await this.repository.find()
        // await this.bus.publish(aggregate.pullDomainEvents());
    }

    private ensureDummyExists(dummy) {
        if(undefined === dummy){
            throw new DummyNotFound(`Dummy doesn't exist`);
        }
    }
}
