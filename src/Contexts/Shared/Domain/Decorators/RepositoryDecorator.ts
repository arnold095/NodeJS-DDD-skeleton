import { Class } from '../Utils/Class';
import { NewableClass } from '../Utils/NewableClass';

type RepositoryArgs<A> = {
  abstraction: Class<A>;
};

type RepositoryProps<A, I extends A> = RepositoryArgs<A> & {
  target: NewableClass<I>;
};

export const repositories: RepositoryProps<unknown, unknown>[] = [];

export const isRepository = <A>(props?: RepositoryArgs<A>): Class<unknown> => {
  return <I extends A>(target: NewableClass<I>): Class<unknown> => {
    if (props) {
      repositories.push({ ...props, target });
    }

    return target;
  };
};
