import { ReactNode } from "react";
const compose =
  (...wrappers: ((component: () => ReactNode) => () => JSX.Element)[]) =>
  (appComponent: () => JSX.Element) =>
    wrappers.reduceRight(
      (
        appComponentAcc: () => JSX.Element,
        wrapper: (component: () => ReactNode) => () => JSX.Element
      ) => {
        return wrapper(appComponentAcc);
      },
      appComponent
    );
export default compose;
