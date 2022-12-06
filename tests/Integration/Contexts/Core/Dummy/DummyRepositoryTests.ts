import { Dummy } from '../../../../../src/Contexts/Core/Dummy/Domain/Dummy';
import { DummyId } from '../../../../../src/Contexts/Core/Dummy/Domain/DummyId';
import { DummyRepository } from '../../../../../src/Contexts/Core/Dummy/Domain/DummyRepository';
import { TestDummies } from '../../../../Builders/TestDummies';

export const dummyRepositoryTests = (repository: DummyRepository): void => {
  describe(`Common tests for ${repository.constructor.name}`, () => {
    describe('Save a dummy', () => {
      it('should save a dummy', async () => {
        // Arrange
        const dummy = TestDummies.aDummy().build();

        // Act
        await repository.save(dummy);

        // Assert
        const foundDummy = (await repository.find(dummy.id)) as Dummy;

        expect(foundDummy.id.value).toBe(dummy.id.value);
        expect(foundDummy.name.value).toBe(dummy.name.value);
      });
    });

    describe('Find a dummy', () => {
      it('should find a dummy', async () => {
        // Arrange
        const dummy = TestDummies.aDummy().build();
        await repository.save(dummy);
        // Act
        const foundDummy = await repository.find(dummy.id);
        // Assert
        expect(foundDummy).toBeDefined();
      });

      it('should return undefined if the dummy does not exist', async () => {
        // Arrange
        const dummyId = DummyId.random();
        // Act
        const foundDummy = await repository.find(dummyId);
        // Assert
        expect(foundDummy).toBeUndefined();
      });
    });
  });
};
