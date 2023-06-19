import { useEffect } from "react";
import style from "./Home.module.scss";

import { PostList } from "features/PostList";
import { SliderOfRecentPosts } from "features/SliderOfRecentPosts";
import { motion } from "framer-motion";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <motion.div
      className={style.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={style.wrapper__content}>
        <SliderOfRecentPosts />
        <PostList />
      </div>
    </motion.div>
  );
};
