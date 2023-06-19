function compose(
  ...wrappers: ((component: () => JSX.Element) => () => JSX.Element)[]
) {
  return function (appComponent: () => JSX.Element) {
    return wrappers.reduceRight(
      (
        appComponentAcc: () => JSX.Element,
        wrapper: (component: () => JSX.Element) => () => JSX.Element
      ) => {
        return wrapper(appComponentAcc);
      },
      appComponent
    );
  };
}
export default compose;
