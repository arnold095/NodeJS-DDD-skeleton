import { injectable } from 'inversify';
import { UserAuthEntity } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/UserAuthEntity';
import { TypeORMClient } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMClient';
import { UserAuth } from '@/src/Contexts/Auth/Authentication/Domain/UserAuth';
import { UserAuthRepository } from '@/src/Contexts/Auth/Authentication/Domain/UserAuthRepository';
import { UserAuthEmail } from '@/src/Contexts/Auth/Authentication/Domain/ValueObject/UserAuthEmail';
import { Nullable } from '@/src/Contexts/Shared/Domain/Utils/Nullable';

@injectable()
export class TypeOrmUserAuthRepository
  extends TypeORMClient
  implements UserAuthRepository
{
  public async find(email: UserAuthEmail): Promise<Nullable<UserAuth>> {
    let user;
    const repository = await this.repository(UserAuthEntity);
    const entity = await repository.findOne({
      where: {
        _email: email.value,
      },
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
