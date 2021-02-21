export const eventSubscribers = [];

export function eventSubscriber() {
    return function (target: Function) {
        eventSubscribers.push(target);
    }
}
