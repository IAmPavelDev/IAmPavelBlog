import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import store from "../../state/store";
import { IPost } from "../../state/types";
import Head from "../Head/Head";
import style from "./Blog.module.scss";
import Post from "./Post/Post";

const PostList = observer(() => {
    const posts = store.getPosts.length ? (
        store.getPosts
            .map((post: IPost) => {
                const id = uuid().slice(0, 8);
                return (
                    <div key={post.postId} id={id} className={style.blog__post}>
                        <Post
                            contentEditable={false}
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
            .reverse()
    ) : (
        <p>Store's empty</p>
    );
    return <div className={style.blog}>{posts}</div>;
});

const Blog = () => {
    useEffect(() => {
        store.loadPosts();
    });
    return (
        <div className={style.wrapper}>
            <Head />
            <PostList />
        </div>
    );
};

export default Blog;
