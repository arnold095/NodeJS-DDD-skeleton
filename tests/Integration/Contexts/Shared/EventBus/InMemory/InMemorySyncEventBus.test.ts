import { InMemorySyncEventBus } from '../../../../../../src/Contexts/Shared/Infrastructure';
import { eventBusTests } from '../EventBusTests';

const eventBus = new InMemorySyncEventBus();

eventBusTests(eventBus);
