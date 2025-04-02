import { mock, mockReset } from 'vitest-mock-extended';

import { CreateDummy } from '../../../../../src/Contexts/Core/Dummy/Application/UseCases/CreateDummy';
import { Dummy } from '../../../../../src/Contexts/Core/Dummy/Domain/Dummy';
import { DummyId } from '../../../../../src/Contexts/Core/Dummy/Domain/DummyId';
import { InMemoryDummyRepository } from '../../../../../src/Contexts/Core/Dummy/Infrastructure/InMemoryDummyRepository';
import { EventBus } from '../../../../../src/Contexts/Shared/Domain';
import { StringMother } from '../../../../ObjectMother';

const eventBus = mock<EventBus>();
let dummyRepository: InMemoryDummyRepository;

const arrange = (params: { dummies?: Dummy[] }): CreateDummy => {
  dummyRepository = new InMemoryDummyRepository(params.dummies);

  return new CreateDummy(dummyRepository, eventBus);
};

beforeEach(() => {
  mockReset(eventBus);
});

describe('CreateDummy', () => {
  it('should create a dummy', async () => {
    // Arrange
    const params = {
      id: DummyId.random().value,
      name: StringMother.random({ length: 15 }),
    };

    const useCase = arrange({});

    // Act
    await useCase.execute(params);

    // Assert
    const dummy = (await dummyRepository.find(DummyId.of(params.id))) as Dummy;

    expect(dummy).toBeDefined();
    expect(dummy.id.value).toBe(params.id);
    expect(dummy.name.value).toBe(params.name);
  });
});
