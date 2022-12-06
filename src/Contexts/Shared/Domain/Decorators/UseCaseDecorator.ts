import { Class } from '../Utils/Class';
export const useCases = new Set<Class<unknown>>();
export const IsUseCase = (): Class<unknown> => {
  return <TFunction extends Class<unknown>>(target: TFunction): TFunction => {
    useCases.add(target);

    return target;
  };
};
