import { MotherCreator } from "./MotherCreator";

export class PriceMother {
    static create() {
        return parseFloat(MotherCreator.random().commerce.price());
    }
}