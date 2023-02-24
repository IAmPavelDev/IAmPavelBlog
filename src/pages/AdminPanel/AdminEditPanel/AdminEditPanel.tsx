import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "shared/store";
import { IPost } from "shared/types";
import style from "./AdminEditPanel.module.scss";
import { v4 as uuid } from "uuid";

export const AdminEditPanel = observer(() => {
  return (
    <div className={style.wrapper}>
      {/* {store.postStore.getPostsIdsToDisplay
        .map((post: IPost) => {
          const id = uuid().slice(0, 8);
          return (
            <div
              id={id}
              key={post.postId}
              className={style.wrapper__post}
              onClick={() => {}}
            >
              here's some post with id {id} and title {post.title}
            </div>
          );
        })
        .reverse()} */}
    </div>
  );
});
