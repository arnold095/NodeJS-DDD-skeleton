import { ClassConstructor } from '@/src/Contexts/Shared/Domain/Utils/GenericTypes';

export type AdapterTypes = {
  controllers?: ClassConstructor<unknown>[];
  services?: ClassConstructor<unknown>[];
  domainContracts?: {
    abstract: string;
    concrete: ClassConstructor<unknown>;
  }[];
  domainEventSubscribers?: ClassConstructor<unknown>[];
};
