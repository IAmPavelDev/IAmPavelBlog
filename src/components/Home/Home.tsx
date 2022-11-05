import React, { FC, useEffect } from "react";
import store from "../../state/store";
import Blog from "../Blog/Blog";
import Head from "../Head/Head";
import SlideRecent from "../Slider/SlideRecent";
import style from "./Home.module.scss";

const Home: FC<{}> = () => {
  useEffect(() => {
    store.loadPosts();
  });
  return (
    <div className={style.wrapper}>
      <Head />
      <SlideRecent />
      <Blog />
    </div>
  );
};

export default Home;
