import { inject, injectable } from 'inversify';
import { DummyRepository } from "@/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyFinderRequest } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinderRequest";
import { DummyId } from "@/Contexts/MyApp/Dummy/Domain/ValueObject/DummyId";
import { Dummy } from "@/Contexts/MyApp/Dummy/Domain/Dummy";

@injectable()
export class DummyFinder {
    public constructor(
        @inject('DummyRepository') private readonly repository: DummyRepository
    ) {
    }

    public async run(params: DummyFinderRequest): Promise<Dummy> {
        const id = new DummyId(params.id);
        return await this.repository.find(id);
    }
}
