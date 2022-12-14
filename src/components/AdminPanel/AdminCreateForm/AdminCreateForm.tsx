import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { PostCreateForm, Tag } from "./types";
import { IPost } from "../../../types";

import Card from "@mui/material/Card";
import AdminCreateFormView from "./AdminCreateFormView";
import Head from "../../Head/Head";
import style from "./AdminCreateForm.module.scss";
import PostsStore from "../../../state/store";

const AdminCreateForm: FC<{}> = observer(() => {
  const [tagsList, setTagsList] = useState<Array<Tag>>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [contentData, setContentData] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<PostCreateForm>();

  const onSubmit = (post: PostCreateForm) => {
    console.log(1);

    const tagsData = tagsList.map((tag: Tag) => {
      return { tagWord: tag.tagWord, id: tag.id };
    });
    const Post: IPost = {
      title: post.title,
      preview: post.preview,
      content: contentData,
      tags: tagsData,
      previewImage,
    };
    PostsStore.addPosts(Post);
    reset();
    setTagsList([]);
  };

  function tagCreator(tagText: string) {
    const tagId = uuidv4();
    const tag: Tag = {
      content: (
        <span key={tagId} className={style.tags__cards__badge}>
          <Card>
            <div
              onClick={() => {
                setTagsList((prev: Tag[]) => {
                  return prev.filter((tag: Tag) => tag.id !== tagId);
                });
              }}
              className={style.tags__badges__mask}
            >
              X
            </div>
            #{tagText}
          </Card>
        </span>
      ),
      id: tagId,
      tagWord: tagText,
    };
    setTagsList((prev: Tag[]) => [...prev, tag]);
  }

  return (
    <>
      <Head />
      <AdminCreateFormView
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setContentData={setContentData}
        tagsList={tagsList}
        tagCreator={tagCreator}
      />
    </>
  );
});

export default AdminCreateForm;
