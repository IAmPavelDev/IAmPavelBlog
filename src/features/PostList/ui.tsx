import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef } from "react";
import { store } from "../../shared/store";
import PostPreview from "./PostPreview/PostPreview";
import style from "./style.module.scss";

const Wrapper: FC<{ page?: number }> = observer(() => {
  return (
    <div className={style.wrapper__blog}>
      {store.postStore.getPostsIdsToDisplay.map((postId?: string) => {
        return (
          <div key={postId}>
            <PostPreview postId={postId} />
          </div>
        );
      })}
    </div>
  );
});

export const PostList = () => {
  const currentPage = useRef<number>(0);

  useEffect(() => {
    store.postStore
      .loadPosts()
      .then(() => (currentPage.current = store.postStore.getCurrentPage()));
  });

  return <Wrapper page={currentPage.current} />;
};
