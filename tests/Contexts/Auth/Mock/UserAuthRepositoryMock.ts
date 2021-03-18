import { UserAuthRepository } from "../../../../src/Contexts/Auth/Domain/UserAuthRepository";
import { UserAuth } from "../../../../src/Contexts/Auth/Domain/UserAuth";

export class UserAuthRepositoryMock implements UserAuthRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();

    public async find(): Promise<UserAuth> {
        return Promise.resolve(undefined);
    }

    public async save(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
