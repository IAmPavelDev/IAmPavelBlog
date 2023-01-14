import React, { useEffect } from "react";
import store from "../../state/store";
import Blog from "../Blog/Blog";
import Head from "../Head/Head";
import SlideRecent from "../Slider/SlideRecent";
import style from "./Home.module.scss";
// import LoadingAnimation from "../../Elements/LoadingAnimation";

const Home = () => {
  useEffect(() => {
    store.loadPosts().then((r) => {});
  });
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__head}>
        <Head />
      </div>
      <div className={style.wrapper__content}>
        <SlideRecent />
        <Blog />
      </div>
    </div>
  );
};

export default Home;
