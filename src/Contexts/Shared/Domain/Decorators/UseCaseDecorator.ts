export const IsUseCase = (): ClassDecorator => {
  return <TFunction>(target: TFunction): TFunction => {
    return target;
  };
};
