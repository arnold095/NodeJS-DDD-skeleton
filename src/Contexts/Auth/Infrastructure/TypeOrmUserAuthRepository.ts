import { UserAuthRepository } from "@/Contexts/Auth/Domain/UserAuthRepository";
import { UserAuthEmail } from "@/Contexts/Auth/Domain/ValueObject/UserAuthEmail";
import { UserAuth } from "@/Contexts/Auth/Domain/UserAuth";
import { injectable } from "inversify";
import { UserAuthEntity } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/UserAuthEntity";
import { TypeORMClient } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMClient";

@injectable()
export class TypeOrmUserAuthRepository extends TypeORMClient implements UserAuthRepository {
    public async find(email: UserAuthEmail): Promise<UserAuth> {
        let user: UserAuth;
        const repository = await this.repository(UserAuthEntity);
        const entity = await repository.findOne({
            where: {
                _email: email.value
            }
        });
        if (entity) {
            user = entity.toDomainModel();
        }
        return user;
    }

    public async save(user: UserAuth): Promise<void> {
        const repository = await this.repository(UserAuthEntity);
        const entity = UserAuthEntity.fromDomainClass(user);

        await repository.save(entity);
    }

}
