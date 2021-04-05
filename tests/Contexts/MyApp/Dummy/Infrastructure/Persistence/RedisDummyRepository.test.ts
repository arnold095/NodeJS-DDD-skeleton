import { DummyRepository } from "../../../../../../src/Contexts/MyApp/Dummy/Domain/DummyRepository";
import { DummyMother } from "../../Domain/DummyMother";
import { Arranger } from "../../../Shared/Infratructure/Arranger";
import { RedisDummyRepository } from "../../../../../../src/Contexts/MyApp/Dummy/Infrastructure/RedisDummyRepository";

let repository: DummyRepository;
beforeAll(async () => {
    await Arranger.run();
    repository = new RedisDummyRepository();
});
describe('RedisDummyRepository #save', () => {
    it('Should save the object', async () => {
        const dummy = DummyMother.create();
        await repository.save(dummy);
    });
});
