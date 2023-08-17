import compose from "./tools/markupCompose";
import { withRouter } from "./with-router";
import { withPostsLoader } from "./with-posts-loader";

export const withProviders = compose(withRouter, withPostsLoader);
