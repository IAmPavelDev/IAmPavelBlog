import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

export const withRouter = (component: () => ReactNode) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;
