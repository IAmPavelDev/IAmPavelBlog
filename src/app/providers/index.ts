import compose from "./tools/markupCompose";
import { withRouter } from "./with-router";

export const withProviders = compose(withRouter);
