import { InMemorySyncEventBus } from "@/Contexts/Shared/Infrastructure/EventBus/InMemory/InMemorySyncEventBus";
import { ContainerTypes } from "../ContainerTypes";

export class SharedContainer {
    public static getContainer(): ContainerTypes {
        return {
            buses: [
                {
                    abstract: 'EventBus',
                    concrete: InMemorySyncEventBus
                }
            ]
        };
    }
}