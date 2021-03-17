import { inject, injectable } from 'inversify';
import { DummyRepository } from "@/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";
import { DummyFinderRequest } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinderRequest";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";

@injectable()
export class DummyFinder {
    public constructor(
        @inject('DummyRepository') private readonly repository: DummyRepository
    ) {
    }

    public async run(params: DummyFinderRequest): Promise<void> {
        const id = new DummyId(params.id);
        const dummy = await this.repository.find(id);
    }
}
