import { Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { store } from "shared/store";
import { PostPreview } from "./PostPreview";
import style from "./style.module.scss";

const List = observer(() => {
  const navigate = useNavigate();
  const { isFetching } = store.postStore.postsFetchingState;

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__blog}>
        {isFetching &&
          Array(8)
            .fill(1)
            .map((i, idx) => {
              return (
                <Skeleton
                  className={style.blog__post}
                  key={idx}
                  height={"25vw"}
                  width={"23vw"}
                />
              );
            })}
        <AnimatePresence mode="sync">
          {!isFetching &&
            store.postStore.getPostsIdsToDisplay.map(
              (postId: string, id: number) => {
                return (
                  <motion.div
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    key={postId + id}
                    onClick={() => {
                      postId && navigate("/post/" + postId);
                    }}
                    className={style.blog__post}
                  >
                    <PostPreview postId={postId} />
                  </motion.div>
                );
              }
            )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export const PostList = () => {
  return <List />;
};
