import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import store from "../../state/store";
import { IPost } from "../../state/types";
import Post from "../Blog/Post/Post";
import style from "./AdminEditPanel.module.scss";
import { v4 as uuid } from "uuid";
import { wrapGrid } from "animate-css-grid";

const AdminEditPanel = observer(() => {
    const postsWrapper = useRef(null);
    useEffect(() => {
        if (postsWrapper.current) wrapGrid(postsWrapper.current);
    });
    return (
        <div className={style.wrapper} ref={postsWrapper}>
            {store.getPosts
                .map((post: IPost) => {
                    const id = uuid().slice(0, 8);
                    return (
                        <div
                            id={id}
                            key={post.postId}
                            className={style.wrapper__post}
                            onClick={() => {}}
                        >
                            <Post
                                contentEditable={true}
                                content={post.content}
                                title={post.title}
                                postId={post.postId}
                                parentId={id}
                                parentStyle={style}
                            />
                        </div>
                    );
                })
                .reverse()}
        </div>
    );
});

export default AdminEditPanel;
