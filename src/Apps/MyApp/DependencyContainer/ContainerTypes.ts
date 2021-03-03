export type ContainerTypes = {
    controllers?: any[],
    services?: any[];
    repositories?: {
        abstract: string,
        concrete: any
    }[];
    domainEventSubscribers?: any[];
    buses?: {
        abstract: string,
        concrete: any
    }[];
}
