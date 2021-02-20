import { Dummy } from "./Dummy";

export interface DummyRepository {
    find(): Promise<Dummy>;
    create(dummy: Dummy): Promise<void>;
}