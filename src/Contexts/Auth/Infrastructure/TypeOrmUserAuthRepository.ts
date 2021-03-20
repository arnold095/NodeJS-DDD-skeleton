import { UserAuthRepository } from "@/Contexts/Auth/Domain/UserAuthRepository";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";
import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";
import { injectable } from "inversify";

@injectable()
export class TypeOrmUserAuthRepository implements UserAuthRepository {
    public find(email: UserAuthEmail): Promise<UserAuth> {
        return Promise.resolve(undefined);
    }

    public save(user: UserAuth): Promise<void> {
        return Promise.resolve(undefined);
    }

}
