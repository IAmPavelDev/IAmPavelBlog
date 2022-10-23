import { observer } from "mobx-react-lite";
import React from "react";
import store from "../../state/store";
import { IPost } from "../../types";
import Post from "../Blog/Post/Post";
import style from "./AdminEditPanel.module.scss";
import { v4 as uuid } from "uuid";

const AdminEditPanel = observer(() => {
    return (
        <div className={style.wrapper}>
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
                                tags={post.tags}
                                preview={post.preview}
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
