import { AuthorizationUser } from "@/Contexts/Auth/Authorization/Domain/AuthorizationUser";

export interface AuthorizationUserEncode {
    encode(user: AuthorizationUser): Promise<any>;
}
