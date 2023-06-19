import compose from "./tools/markupCompose";
import { withRouter } from "./with-router";
import { withSuspense } from "./with-suspense";

export const withProviders = compose(withSuspense, withRouter);
