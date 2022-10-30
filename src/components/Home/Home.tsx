import React, { FC } from "react";
import Blog from "../Blog/Blog";
import Head from "../Head/Head";
import SlideRecent from "../Slider/SlideRecent";
import style from "./Home.module.scss";

const Home: FC<{}> = () => {
  return (
    <div className={style.wrapper}>
      <Head />
      <SlideRecent />
      <Blog />
    </div>
  );
};

export default Home;
