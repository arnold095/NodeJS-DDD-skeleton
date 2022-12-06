import { EventHandler } from '../Bus/EventHandler';
import { Class } from '../Utils/Class';

export const eventHandlers = new Set<Class<EventHandler>>();

export const isDomainEventHandler = (): ClassDecorator => {
  return <TFunction extends Class<EventHandler>>(target: TFunction): TFunction => {
    eventHandlers.add(target);

    return target;
  };
};
