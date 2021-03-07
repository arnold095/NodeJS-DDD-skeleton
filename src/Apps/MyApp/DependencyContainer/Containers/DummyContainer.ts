import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyCreator";
import { RedisDummyRepository } from "@/Contexts/MyApp/Dummy/Infrastructure/RedisDummyRepository";
import { DummyPostController } from "../../Controller/Dummy/Post/DummyPostController";
import { ContainerTypes } from "../ContainerTypes";
import { TypeORMDummyRepository } from "@/Contexts/MyApp/Dummy/Infrastructure/TypeORMDummyRepository";

export class DummyContainer {
    public static container(): ContainerTypes {
        return {
            controllers: [
                DummyPostController
            ],
            services: [
                DummyCreator
            ],
            repositories: [
                {
                    abstract: 'DummyRepository',
                    concrete: TypeORMDummyRepository
                }
            ]
        };
    }
}
