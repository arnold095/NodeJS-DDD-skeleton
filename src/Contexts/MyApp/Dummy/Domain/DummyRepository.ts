import { Dummy } from "./Dummy";
import { DummyId } from "./ValueObject/DummyId";

export interface DummyRepository {
    find(id: DummyId): Promise<Dummy>;
    create(dummy: Dummy): Promise<void>;
}