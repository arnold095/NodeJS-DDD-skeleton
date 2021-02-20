import { DummyCreator } from "@/Contexts/MyApp/Dummy/Application/DummyCreator";
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
            ]
        };
    }
}