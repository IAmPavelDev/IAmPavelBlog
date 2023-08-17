import { store } from "shared/store";
import { ReactNode, useEffect, useRef } from "react";

export const withPostsLoader = (component: () => ReactNode) => () => {
  useEffect(() => {
    store.postStore.load(
      store.postStore.getCurrentFetchingState.lastFetchedPage + 1
    );
  });

  return <>{component()}</>;
};
