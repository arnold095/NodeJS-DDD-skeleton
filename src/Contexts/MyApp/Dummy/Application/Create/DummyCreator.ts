import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { inject, injectable } from "inversify";
import { Dummy } from "../../Domain/Dummy";
import { DummyRepository } from "../../Domain/DummyRepository";
import { DummyAlreadyExist } from "../../Domain/Exception/DummyAlreadyExist";
import { DummyContent } from "../../Domain/ValueObject/DummyContent";
import { DummyEmail } from "../../Domain/ValueObject/DummyEmail";
import { DummyId } from "../../Domain/ValueObject/DummyId";
import { DummyTitle } from "../../Domain/ValueObject/DummyTitle";
import { DummyCreatorRequest } from "./DummyCreatorRequest";
@injectable()
export class DummyCreator {
    constructor(
        @inject('DummyRepository') private readonly repository: DummyRepository,
        @inject('EventBus') private readonly eventBus: EventBus
    ) {
    }

    public async run(request: DummyCreatorRequest) {
        const id = new DummyId(request.id);
        const title = new DummyTitle(request.title);
        const content = new DummyContent(request.content);
        const email = new DummyEmail(request.email);
        await this.ensureDoesNotExist(id);
        const dummy = Dummy.create(id, title, content, email);
        await this.repository.save(dummy);
        await this.eventBus.publish(dummy.pullDomainEvents());
    }

    private async ensureDoesNotExist(id: DummyId) {
        const dummy = await this.repository.find(id);
        if (undefined !== dummy) {
            throw new DummyAlreadyExist('Dummy already exists');
        }
    }
}
