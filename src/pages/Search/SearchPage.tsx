import styles from "./Search.module.scss";

import { Search } from "features/Search";
import { PostList } from "features/PostList";
import { store } from "shared/store";
import { useEffect } from "react";

export const SearchPage = () => {
  useEffect(() => {
    return () => {
      store.postStore.search("", [], false);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <Search />
      <PostList />
    </div>
  );
};
