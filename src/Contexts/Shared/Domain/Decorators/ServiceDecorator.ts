export const isService = (): ClassDecorator => {
  return <TFunction>(target: TFunction): TFunction => {
    return target;
  };
};
