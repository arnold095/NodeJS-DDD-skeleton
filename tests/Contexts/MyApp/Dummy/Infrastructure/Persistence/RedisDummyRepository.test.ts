import { Arranger } from '../../../Shared/Infratructure/Arranger';
import { DummyMother } from '../../Domain/DummyMother';
import { DummyRepository } from '@dummy';

let repository: DummyRepository;
beforeAll(async () => {
  await Arranger.run();
  repository = Arranger.container.get('Dummy.DummyRepository');
});
describe('RedisDummyRepository #save', () => {
  it('Should save the object', async () => {
    const dummy = DummyMother.create();
    await repository.save(dummy);
  });
});
