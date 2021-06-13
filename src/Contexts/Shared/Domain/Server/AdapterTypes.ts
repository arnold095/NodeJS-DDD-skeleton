import { Instantiable } from '@sharedDomain';

export type AdapterTypes = {
  controllers?: Instantiable[];
  services?: Instantiable[];
  domainContracts?: {
    abstract: string;
    concrete: Instantiable;
  }[];
  domainEventSubscribers?: Instantiable[];
};
