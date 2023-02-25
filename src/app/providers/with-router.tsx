import { BrowserRouter } from "react-router-dom";
import { ReactNode, Suspense } from "react";

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
      fallback={<div>Loading...</div>} //TODO
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );
