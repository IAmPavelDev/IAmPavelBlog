import React, { lazy } from "react";
import { withProviders } from "./providers";
const Routing = lazy(() =>
  import("pages").then((module) => ({ default: module.Routing }))
);

const App = () => <div className="app">{<Routing />}</div>;

export default withProviders(App);
