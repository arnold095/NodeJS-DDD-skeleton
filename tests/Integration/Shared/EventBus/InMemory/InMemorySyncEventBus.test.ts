import { InMemorySyncEventBus } from '../../../../../src/Contexts/Shared/Infrastructure/Bus/InMemorySyncEventBus';
import { eventBusTests } from '../EventBusTests';

const eventBus = new InMemorySyncEventBus();

eventBusTests(eventBus);
