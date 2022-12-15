import React, { FC } from "react";
import DateCard from "../../../Elements/DateCard";
import TagCard from "../../../Elements/TagCard";
import { ITag } from "../../../types";
import style from "./PostPreview.module.scss";

const PostPreview: FC<{
  imageUrl: string;
  date?: Date;
  title: string;
  preview: string;
  tags?: ITag[];
}> = ({ imageUrl, date, title, preview, tags }) => {
  console.log("post");
  return (
    <div className={style.preview}>
      <div className={style.preview__image}>
        <img src={imageUrl} />
        <div className={style.preview__mask} />
        <div className={style.preview__image__tags}>
          {tags?.slice(0, 3).map((tag: ITag) => (
            <div key={tag.id} className={style.tags__tag}>
              <TagCard type="light" text={tag.tagWord} />
            </div>
          ))}
        </div>
      </div>
      <div className={style.preview__date}>
        <DateCard fontColorType="dark" dateToDisplay={date} />
      </div>
      <div className={style.preview__title}>{title}</div>
      <div className={style.preview__text}>
        {preview.split("").slice(0, 150).join("")}
      </div>
    </div>
  );
};

export default PostPreview;
