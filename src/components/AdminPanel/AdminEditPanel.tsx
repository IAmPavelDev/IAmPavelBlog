import { observer } from "mobx-react-lite";
import React from "react";
import store from "../../state/store";
import { postObj } from "../../state/types";
import Post from "../Blog/Post/Post";
import style from "./AdminEditPanel.module.scss";

const AdminEditPanel = observer(() => {
    return (
        <div className={style.wrapper}>
            {store.getPosts.map((post: postObj) => {
                return (
                    <div key={post.postId} className={style.wrapper__post}>
                        <Post
                            contentEditable={true}
                            content={post.content}
                            title={post.title}
                        />
                    </div>
                );
            })}
        </div>
    );
});

export default AdminEditPanel;
