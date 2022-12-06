import { InMemoryDummyRepository } from '../../../../../../src/Contexts/Core/Dummy/Infrastructure/InMemoryDummyRepository';
import { dummyRepositoryTests } from '../DummyRepositoryTests';

const dummyRepository = new InMemoryDummyRepository();

dummyRepositoryTests(dummyRepository);
