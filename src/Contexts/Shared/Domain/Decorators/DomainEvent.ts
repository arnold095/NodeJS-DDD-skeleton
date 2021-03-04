export const domainEvents = [];

export function domainEvent() {
    return function (target: Function) {
        domainEvents.push(target);
    }
}
