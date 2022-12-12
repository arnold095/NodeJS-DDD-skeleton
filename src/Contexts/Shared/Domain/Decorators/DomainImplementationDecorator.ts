import { Class } from '../Utils/Class';
import { NewableClass } from '../Utils/NewableClass';

type RepositoryArgs<Abstraction> = {
  abstraction: Class<Abstraction>;
};

type Props<
  Abstraction,
  Implementation extends Abstraction,
> = RepositoryArgs<Abstraction> & {
  implementation: NewableClass<Implementation>;
};

export const domainImplementations: Props<unknown, unknown>[] = [];

export const isDomainImplementation = <Abstraction, Implementation extends Abstraction>(
  props?: RepositoryArgs<Abstraction>,
): Class<Implementation> => {
  return (implementation: NewableClass<Implementation>): Class<Implementation> => {
    if (props && props.abstraction) {
      domainImplementations.push({ abstraction: props.abstraction, implementation });
    }

    return implementation;
  };
};
