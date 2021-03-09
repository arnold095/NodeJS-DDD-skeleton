import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyCreator";
import { DummyPostController } from "../../Controller/Dummy/Post/DummyPostController";
import { ContainerTypes } from "../ContainerTypes";
import { TypeORMDummyRepository } from "@/Contexts/MyApp/Dummy/Infrastructure/TypeORMDummyRepository";
import { DummyGetController } from "@/Apps/MyApp/Controller/Dummy/Get/DummyGetController";
import { DummyFinder } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinder";

export class DummyContainer {
    public static container(): ContainerTypes {
        return {
            controllers: [
                DummyPostController, DummyGetController
            ],
            services: [
                DummyCreator, DummyFinder
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
