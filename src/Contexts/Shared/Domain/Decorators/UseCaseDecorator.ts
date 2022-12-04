import { Class } from '../Utils/Class';

interface Args {
  target: Class<unknown>;
}

export const useCases: Args[] = [];
export const IsUseCase = (): Class<unknown> => {
  return (target: Class<unknown>): Class<unknown> => {
    useCases.push({ target });

    return target;
  };
};
