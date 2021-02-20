import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/DummyCreator";
import { RedisDummyRepository } from "@/Contexts/MyApp/Dummy/Infrastructure/RedisDummyRepository";
import { DummyPostController } from "../../Controller/Dummy/Post/DummyPostController";
import { ContainerTypes } from "../ContainerTypes";

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
                    concrete: RedisDummyRepository
                }
            ]
        };
    }
}