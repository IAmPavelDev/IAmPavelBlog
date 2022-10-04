import React, { useEffect } from "react";
import Head from "../Head/Head";
import style from "./Blog.module.scss";

const About = () => {
    useEffect(() => {
        (async function () {
            // await login();
        })();
    });

    return (
        <div className={style.wrapper}>
            <Head />
            <p>Blog</p>
        </div>
    );
};

export default About;
