import { ContainerTypes } from '@/Apps/MyApp/DependencyContainer/ContainerTypes';
import { RegisterController } from "@/Apps/Auth/Controller/Post/RegisterController";
import { TypeOrmUserAuthRepository } from "@/Contexts/Auth/Authentication/Infrastructure/TypeOrmUserAuthRepository";
import { UserRegister } from "@/Contexts/Auth/Authentication/Application/UserRegister";

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
