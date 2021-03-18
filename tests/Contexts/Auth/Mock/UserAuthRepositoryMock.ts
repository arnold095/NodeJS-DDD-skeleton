import { UserAuthRepository } from "../../../../src/Contexts/Auth/Domain/UserAuthRepository";
import { UserAuth } from "../../../../src/Contexts/Auth/Domain/UserAuth";
import { UserAuthEmail } from "../../../../src/Contexts/Auth/Domain/ValueObject/UserAuthEmail";

export class UserAuthRepositoryMock implements UserAuthRepository {
    private mockedUser: UserAuth[] = [];

    public async find(email: UserAuthEmail): Promise<UserAuth> {
        return this.mockedUser.find(user => user.email.value === email.value);
    }

    public async save(user: UserAuth): Promise<void> {
        this.mockedUser.push(user);
    }
}
