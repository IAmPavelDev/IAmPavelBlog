import React, { useEffect } from "react";
import Head from "../Head/Head";
import style from "./Blog.module.scss";
import { getPosts } from "./../../server/get-posts";

const About = () => {
    useEffect(() => {
        (async function () {
            // await login();
            const posts = await getPosts();
            console.log("posts:  ", posts);
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
