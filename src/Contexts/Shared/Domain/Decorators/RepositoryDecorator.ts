import { Class } from '../Utils/Class';

type RepositoryArgs = {
  abstraction: Class<unknown>;
};

type RepositoryProps = RepositoryArgs & {
  target: unknown;
};

export const repositories: RepositoryProps[] = [];

export const isRepository = (props?: RepositoryArgs): Class<unknown> => {
  return (target: Class<unknown>): Class<unknown> => {
    if (props) {
      repositories.push({ ...props, target });
    }

    return target;
  };
};
