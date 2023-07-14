import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import DateCard from "shared/ui/DateCard";
import TagCard from "shared/ui/TagCard";
import { ITag } from "shared/types/ITag";
import style from "./PostPreview.module.scss";
import { IPost } from "shared/types";
import { store } from "shared/store";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const PostPreview: FC<{
  postId?: string;
}> = ({ postId }) => {
  const [postDataState, setPostDataState] = useState<
    IPost | "Error" | "Loading"
  >("Loading");

  postId &&
    store.postStore.getPostPreviewDataById(postId).then((postData?: IPost) => {
      if (!postData || postData.postId != postId) {
        setPostDataState("Error");
        return;
      }
      setPostDataState(postData);
    });

  if (postDataState === "Error") {
    return <></>;
  }
  if (postDataState === "Loading") {
    return <></>;
  }
  return (
    <div className={style.preview}>
      <div className={style.preview__image}>
        <LazyLoadImage
          src={postDataState.previewImage}
          alt={"preview " + postDataState.title}
          effect="opacity"
          className={style.img}
          placeholderSrc={"/placeholder-image.jpg"}
        />
        <div className={style.preview__mask} />
        <div className={style.preview__image__tags}>
          {postDataState.tags?.slice(0, 3).map((tag: ITag) => (
            <div key={tag.id} className={style.tags__tag}>
              <TagCard type="light" text={tag.content} />
            </div>
          ))}
        </div>
      </div>
      <div className={style.preview__date}>
        <DateCard
          fontColorType="dark"
          dateToDisplay={postDataState.creationDate}
        />
      </div>
      <div className={style.preview__title}>{postDataState.title}</div>
      <div className={style.preview__text}>
        {postDataState.preview.split("").slice(0, 150).join("")}
      </div>
    </div>
  );
};

export default PostPreview;
