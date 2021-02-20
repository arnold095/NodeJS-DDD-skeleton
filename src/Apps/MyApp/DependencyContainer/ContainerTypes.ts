export type ContainerTypes = {
    controllers?: any[],
    services?: any[];
    repositories?: {
        abstract: string,
        concrete: any
    }[];
    buses?: {
        abstract: string,
        concrete: any
    }[];
}