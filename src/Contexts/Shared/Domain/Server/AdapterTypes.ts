import { ClassConstructor } from '@sharedDomain';

export type AdapterTypes = {
  controllers?: ClassConstructor<unknown>[];
  services?: ClassConstructor<unknown>[];
  domainContracts?: {
    abstract: string;
    concrete: ClassConstructor<unknown>;
  }[];
  domainEventSubscribers?: ClassConstructor<unknown>[];
};
