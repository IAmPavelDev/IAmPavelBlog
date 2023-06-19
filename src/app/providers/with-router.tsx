import { BrowserRouter } from "react-router-dom";
import { ReactNode, Suspense } from "react";

export const withRouter = (component: () => ReactNode) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;
