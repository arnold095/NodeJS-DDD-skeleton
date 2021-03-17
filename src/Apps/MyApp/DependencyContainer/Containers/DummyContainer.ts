import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyCreator";
import { DummyPostController } from "../../Controller/Dummy/Post/DummyPostController";
import { ContainerTypes } from "../ContainerTypes";
import { TypeORMDummyRepository } from "@/Contexts/MyApp/Dummy/Infrastructure/TypeORMDummyRepository";
import { DummyGetController } from "@/Apps/MyApp/Controller/Dummy/Get/DummyGetController";
import { DummyFinder } from "@/Contexts/MyApp/Dummy/Application/Find/DummyFinder";
import { DummyAddressCreator } from "@/Contexts/MyApp/Dummy/Application/Create/DummyAddressCreator";
import { DummyAddressPostController } from "@/Apps/MyApp/Controller/Dummy/Post/DummyAddressPostController";

export class DummyContainer {
    public static container(): ContainerTypes {
        return {
            controllers: [
                DummyPostController, DummyGetController, DummyAddressPostController
            ],
            services: [
                DummyCreator, DummyFinder, DummyAddressCreator
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
