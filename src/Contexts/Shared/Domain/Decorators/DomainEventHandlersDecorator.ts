import { EventHandler } from '../Bus/EventHandler';
import { Class } from '../Utils/Class';

type Handler = Class<EventHandler>;
export const eventHandlers = new Set<Handler>();

export const isDomainEventHandler = (): Handler => {
  return (target: Handler): Handler => {
    eventHandlers.add(target);

    return target;
  };
};
