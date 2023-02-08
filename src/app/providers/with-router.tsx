import { BrowserRouter } from "react-router-dom";
import { ReactNode, Suspense } from "react";

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
      // fallback={<Spin delay={300} className="overlay" size="large" />} //TODO
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );
