import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";

export interface UserAuthRepository {
    save(): Promise<void>;
    find(): Promise<UserAuth>
}
