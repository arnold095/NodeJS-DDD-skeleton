import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";
import { UserAuthId } from "@/Contexts/Auth/Domain/ValueObject/UserAuthId";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";

export interface UserAuthRepository {
    save(user: UserAuth): Promise<void>;

    find(email: UserAuthEmail): Promise<UserAuth>
}
