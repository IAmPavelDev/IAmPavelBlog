import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { store } from "shared/store";
import PostPreview from "./PostPreview/PostPreview";
import style from "./style.module.scss";

const Wrapper = observer(() => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__blog}>
        {store.postStore.getPostsIdsToDisplay.map((postId?: string) => {
          return (
            <Link
              to={"/post/" + postId}
              key={postId}
              className={style.blog__post}
            >
              <PostPreview postId={postId} />
            </Link>
          );
        })}
      </div>
    </div>
  );
});

export const PostList = () => {
  return <Wrapper />;
};
