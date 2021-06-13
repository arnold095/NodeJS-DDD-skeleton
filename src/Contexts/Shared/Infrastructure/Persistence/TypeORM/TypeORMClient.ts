import { Repository } from 'typeorm';
import { inject, injectable } from 'inversify';
import { TypeORMProvider } from '@/src/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMProvider';
import { EntityTarget } from 'typeorm/common/EntityTarget';

@injectable()
export class TypeORMClient {
  constructor(@inject('TypeORMProvider') private readonly provider: TypeORMProvider) {}

  public async repository<Entity>(
    target: EntityTarget<Entity>
  ): Promise<Repository<Entity>> {
    await this.provider.checkConnection();
    return this.provider.connection().getRepository(target);
  }
}
