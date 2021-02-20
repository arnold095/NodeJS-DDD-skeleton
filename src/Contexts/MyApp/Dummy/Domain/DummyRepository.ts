import { Dummy } from "./Dummy";
import { DummyId } from "./ValueObject/DummyId";

export interface DummyRepository {
    find(id: DummyId): Promise<Dummy>;
    save(dummy: Dummy): Promise<void>;
}