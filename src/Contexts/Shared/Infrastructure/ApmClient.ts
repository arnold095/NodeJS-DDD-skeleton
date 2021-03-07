import { injectable } from "inversify";
import { start } from 'elastic-apm-node';

@injectable()
export class ApmClient {
    public static connect() {
        if (process.env.APM_ACTIVE === 'true') {
            start(this.configuration());
        }
    }

    private static configuration() {
        return {
            serviceName: process.env.APM_SERVICE_NAME,
            secretToken: process.env.APM_SECRET_TOKEN,
            apiKey: process.env.APM_API_KEY,
            serverUrl: process.env.APM_SERVER_URL,
            captureExceptions: process.env.APM_CAPTURE_EXCEPTIONS === 'true',
        };
    }
}

ApmClient.connect();
