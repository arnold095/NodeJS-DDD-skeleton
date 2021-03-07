import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import { TypeORMProvider } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/TypeORMProvider";
import { PersistenceEntity } from "@/Contexts/Shared/Domain/Persistence/PersistenceEntity";

@injectable()
export abstract class TypeORMClient {
    protected constructor(
        @inject('TypeORMProvider') private readonly provider: TypeORMProvider
    ) {
    }

    public async repository<T>(target: string | Function): Promise<Repository<PersistenceEntity>> {
        await this.provider.checkConnection();
        return this.provider.connection().getRepository<PersistenceEntity>(target);
    }
}
