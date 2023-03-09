import { Class } from '../Utils/Class';
import { NewableClass } from '../Utils/NewableClass';

type Props<Abstraction, Implementation extends Abstraction> = {
  abstraction: Class<Abstraction>;
  target: NewableClass<Implementation>;
};

export const domainImplementations: Props<unknown, unknown>[] = [];

export const isDomainImplementation = <Abstraction, Implementation extends Abstraction>(
  abstraction?: Class<Abstraction>,
): Class<Implementation> => {
  return (target: NewableClass<Implementation>): Class<Implementation> => {
    if (abstraction) {
      domainImplementations.push({ abstraction, target });
    }

    return target;
  };
};
