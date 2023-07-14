import compose from "./tools/markupCompose";
import { withRouter } from "./with-router";
import { withSuspense } from "./with-suspense";
import { withPostsLoader } from "./with-posts-loader";

export const withProviders = compose(withSuspense, withRouter, withPostsLoader);
