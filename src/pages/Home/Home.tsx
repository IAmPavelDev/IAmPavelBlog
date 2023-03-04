import { useEffect } from "react";
import style from "./Home.module.scss";

import { PostList } from "features/PostList";
import { SliderOfRecentPosts } from "features/SliderOfRecentPosts";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__content}>
        <SliderOfRecentPosts />
        <PostList />
      </div>
    </div>
  );
};
