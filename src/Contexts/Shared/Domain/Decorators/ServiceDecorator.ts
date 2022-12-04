export const IsService = (): ClassDecorator => {
  return <TFunction>(target: TFunction): TFunction => {
    return target;
  };
};
