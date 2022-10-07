import { observer } from "mobx-react-lite";
import React from "react";
import store from "../../state/store";
import { IPost } from "../../state/types";
import Post from "../Blog/Post/Post";
import style from "./AdminEditPanel.module.scss";

const AdminEditPanel = observer(() => {
    return (
        <div className={style.wrapper}>
            {store.getPosts
                .map((post: IPost) => {
                    return (
                        <div className="full">
                            <div
                                key={post.postId}
                                className={style.wrapper__post}
                            >
                                <Post
                                    contentEditable={true}
                                    content={post.content}
                                    title={post.title}
                                    postId={post.postId}
                                />
                            </div>
                        </div>
                    );
                })
                .reverse()}
        </div>
    );
});

export default AdminEditPanel;
