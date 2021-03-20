import { ContainerTypes } from '@/Apps/MyApp/DependencyContainer/ContainerTypes';
import { UserRegister } from "@/Contexts/Auth/Application/UserRegister";
import { TypeOrmUserAuthRepository } from "@/Contexts/Auth/Infrastructure/TypeOrmUserAuthRepository";
import { RegisterController } from "@/Apps/Auth/Controller/Post/RegisterController";

export class UserAuthContainer {

    public static getContainer(): ContainerTypes {
        return {
            controllers: [
                RegisterController
            ],
            services: [
                UserRegister
            ],
            repositories: [
                {
                    abstract: 'UserAuthRepository',
                    concrete: TypeOrmUserAuthRepository
                }
            ]
        };
    }
}
