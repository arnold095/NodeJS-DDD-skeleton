import { Arranger } from "../../../../Shared/Infrastructure/Arranger";
import { DummyRepository } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyMother } from "../../Domain/DummyMother";

let repository: DummyRepository;
beforeAll(async () => {
    await Arranger.run();
    repository = Arranger.container.getClass('DummyRepository');
});
describe('RedisDummyRepository #save', () => {
    it('Should save the object', async () => {
        const dummy = DummyMother.create();
        await repository.save(dummy);
    });
});
