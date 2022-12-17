import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import LoadingAni from "../../Elements/LoadingAni";
import store from "../../state/store";
import { IPost } from "../../types";
import style from "./Blog.module.scss";
import PostPreview from "./PostPreview/PostPreview";

const PostsDataToNodesTraspilator = (data: IPost[]) =>
  data.map((post: IPost) => {
    const id = uuid().slice(0, 8);
    return (
      <div key={id} id={id} className={style.wrapper__blog__post}>
        <PostPreview
          imageUrl={post.previewImage}
          date={post.creationDate}
          title={post.title}
          preview={post.preview}
          tags={post.tags}
          postId={post.postId}
        />
      </div>
    );
  });

const PostsList: FC<{
  isLoadingCallbackHandler: (arg0: (arg0: boolean) => void) => void;
}> = observer(({ isLoadingCallbackHandler }) => {
  console.log("list");
  const posts = useRef<JSX.Element[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  isLoadingCallbackHandler(setIsLoading);

  const newPosts: JSX.Element[] = PostsDataToNodesTraspilator(
    store.getPosts.slice(posts.current.length, store.getPosts.length)
  );
  posts.current = [...posts.current, ...newPosts];

  return (
    <div className={style.wrapper__blog}>
      {isLoading ? (
        <>
          {[...posts.current]}{" "}
          <div className={style.blog__loadingSpinner}>
            <LoadingAni />
          </div>
        </>
      ) : (
        [...posts.current, ...newPosts]
      )}
    </div>
  );
});

const Blog = () => {
  console.log("blog");
  const [isFullMode, setIsFullMode] = useState<boolean>(false);
  useEffect(() => {
    store.loadPosts();
  });

  let isLoadingCallback: (arg0: boolean) => void = () => {};
  const isLoadingCallbackHandler = (setIsLoading: (arg0: boolean) => void) =>
    (isLoadingCallback = setIsLoading);

  return (
    <div className={style.wrapper}>
      <PostsList isLoadingCallbackHandler={isLoadingCallbackHandler} />
      {isFullMode ? (
        <></>
      ) : (
        <div
          className={style.wrapper__loadmore}
          onClick={() => {
            setIsFullMode(true);
            isLoadingCallback(true);
            store.loadPosts();
          }}
        >
          View more posts
        </div>
      )}
    </div>
  );
};

export default Blog;
