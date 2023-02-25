import React, { lazy, Suspense, useEffect } from "react";
import { withProviders } from "./providers";
import { LoadingBadgeForGlobalSuspense } from "../shared/ui/LoadingBadgeForGloabalSuspense";

const Routing = lazy(() =>
  import("pages").then((module) => ({ default: module.Routing }))
);

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<LoadingBadgeForGlobalSuspense text={"pt-blog"} />}>
        {<Routing />}
      </Suspense>
    </div>
  );
};

export default withProviders(App);
