import React, { useEffect, useState } from "react";
import store from "../../state/store";
import Blog from "../Blog/Blog";
import Head from "../Head/Head";
import SlideRecent from "../Slider/SlideRecent";
import style from "./Home.module.scss";
import LoadingAnimation from "../../Elements/LoadingAnimation";


const Home = () => {

    const [isAppLoaded, setIsAppLoaded] = useState(false);

    useEffect(() => {
    store.loadPosts().then(r => {});
    setIsAppLoaded(true);
  });
  return (
    <div className={style.wrapper}>


        {isAppLoaded ? <>

            <Head />
        <SlideRecent />
        <Blog />

        </> : <LoadingAnimation />}

    </div>
  );
};

export default Home;
