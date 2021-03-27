import { Arranger } from "../../Shared/Infrastructure/Arranger";
import { UserAuthRepository } from "../../../../src/Contexts/Auth/Authentication/Domain/UserAuthRepository";
import { UserAuthMother } from "../Domain/UserAuthMother";
import { UserAuthEmailMother } from "../Domain/UserAuthEmailMother";

let repository: UserAuthRepository;
beforeAll(async () => {
    await Arranger.run();
    repository = Arranger.container.getClass('UserAuthRepository');
});

describe('When the user registers', () => {
    it('ensure that it is saved', async () => {
        const user = UserAuthMother.create();
        await repository.save(user);
        const userFound = await repository.find(user.email);
        expect(user.id.value).toEqual(userFound.id.value);
    });

    it('User not found', async () => {
        const email = UserAuthEmailMother.create();
        const user = await repository.find(email);
        expect(user).toBeUndefined();
    });
});
