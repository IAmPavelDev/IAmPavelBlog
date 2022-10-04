import React, { FC } from "react";
import style from "./Post.module.scss";

const Post: FC<{ content: string; title: string }> = ({ content, title }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper__title}>{title}</div>
            <div className={style.wrapper__content}>{content}</div>
        </div>
    );
};

export default Post;
