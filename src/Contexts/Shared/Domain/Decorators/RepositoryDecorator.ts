export const IsRepository = (): ClassDecorator => {
  return <TFunction>(target: TFunction): TFunction => {
    return target;
  };
};
