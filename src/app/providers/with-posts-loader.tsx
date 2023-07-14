import { store } from "shared/store";
import { ReactNode, useEffect, useRef } from "react";

export const withPostsLoader = (component: () => ReactNode) => () => {
  const currentPage = useRef<number>(1);

  useEffect(() => {
    store.postStore.loadPosts(currentPage.current);
  });

  return <>{component()}</>;
};
