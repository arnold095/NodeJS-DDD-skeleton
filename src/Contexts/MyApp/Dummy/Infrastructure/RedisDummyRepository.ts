import { RedisClient } from "@/Contexts/Shared/Persistence/Redis/RedisClient";
import { injectable } from "inversify";
import { Dummy } from "../Domain/Dummy";
import { DummyRepository } from "../Domain/DummyRepository";


export class RedisDummyRepository extends RedisClient implements DummyRepository {
    public async find(): Promise<Dummy> {
        throw new Error("Method not implemented.");
    }
    public async create(dummy: Dummy): Promise<void> {
        throw new Error("Method not implemented.");
    }

}