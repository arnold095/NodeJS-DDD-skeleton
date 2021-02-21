export const domainEventSubscribers = [];

export function domainEventSubscriber() {
    return function (target: Function) {
        domainEventSubscribers.push(target);
    }
}
