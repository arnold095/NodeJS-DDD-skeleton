import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";

export class App {

    constructor() {
        const container = new InversifyAdapter();
    }

    public async bootStrap() {
        await this.connectToServices();

    }

    private async connectToServices() {

    }
}
const app = new App();
app.bootStrap();