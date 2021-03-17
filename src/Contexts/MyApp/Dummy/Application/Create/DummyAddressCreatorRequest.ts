export class DummyAddressCreatorRequest {
    constructor(public readonly id: string,
                public readonly dummyId: string,
                public readonly alias: string,
                public readonly street: string,
                public readonly city: string,
                public readonly postalCode: string,
                public readonly country: string) {
    }
}
