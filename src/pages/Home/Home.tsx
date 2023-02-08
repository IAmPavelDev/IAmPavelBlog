import React, { useContext, useEffect } from "react";
import style from "./Home.module.scss";

import { PostList } from "features/PostList";
import { Head } from "features/Head";
import { SliderOfRecentPosts } from "features/SliderOfRecentPosts";

import { store } from "shared/store";

export const Home = () => {
  useEffect(() => {
    store.postStore.loadPosts().then((r) => {});
  });
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__head}>
        <Head />
      </div>
      <div className={style.wrapper__content}>
        <SliderOfRecentPosts />
        <PostList />
      </div>
    </div>
  );
};
