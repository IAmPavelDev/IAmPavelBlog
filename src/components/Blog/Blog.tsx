import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import Tag from "../../Elements/Tag";
import store from "../../state/store";
import { IPost, ITag } from "../../types";
import Head from "../Head/Head";
import Search from "../Search/Search";
import style from "./Blog.module.scss";
import Post from "./Post/Post";

const PostList = observer(() => {
    const posts = store.getPosts.length ? (
        store.getPosts
            .map((post: IPost) => {
                const id = uuid().slice(0, 8);
                return (
                    <div key={id} id={id} className={style.blog__post}>
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
        <p>Loading...</p>
    );
    return <div className={style.blog}>{posts}</div>;
});

const TagsInSearch = observer(() => {
    return (
        <div className={style.filterTags}>
            {store.tagsInUse.map((tag: ITag) => {
                return <Tag key={tag.id} removable tagData={tag.tagWord} />;
            })}
        </div>
    );
});

const Blog = () => {
    useEffect(() => {
        store.loadPosts();
    });
    return (
        <div className={style.wrapper}>
            <Head />
            <Search />
            <TagsInSearch />
            <PostList />
        </div>
    );
};

export default Blog;
