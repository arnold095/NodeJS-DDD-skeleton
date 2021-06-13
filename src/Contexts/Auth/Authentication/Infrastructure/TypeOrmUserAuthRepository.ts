import { injectable } from 'inversify';
import { TypeORMClient, UserAuthEntity } from '@sharedInfra';
import { Nullable } from '@sharedDomain';
import { UserAuth, UserAuthEmail, UserAuthRepository } from '@authentication';

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
