import React, { FC, ReactNode, useEffect, useState } from "react";
import Head from "../Head/Head";
import style from "./AdminPanel.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import PostsStore from "../../state/store";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { IPost } from "../../types";
import { uuid } from "uuidv4";

type PostCreateForm = {
  title: string;
  content: string;
  preview: string;
  tag: string;
};

type Tag = {
  content: ReactNode;
  tagWord: string;
  id: string;
};

const AdminPostForm: FC<{}> = observer(() => {
  const [tagsList, setTagsList] = useState<Array<Tag>>([]);
  const [newTag, setNewTag] = useState<string>("");
  const { register, handleSubmit, watch, reset } = useForm<PostCreateForm>();

  const onSubmit = (post: PostCreateForm) => {
    const tagsData = tagsList.map((tag: Tag) => {
      return { tagWord: tag.tagWord, id: tag.id };
    });
    const Post: IPost = {
      title: post.title,
      content: post.content,
      preview: post.preview,
      tags: tagsData,
    };
    PostsStore.addPosts(Post);
    reset();
    setTagsList([]);
  };

  function tagCreator(content: string) {
    const tagId = uuid();
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
            #{content}
          </Card>
        </span>
      ),
      id: tagId,
      tagWord: content,
    };
    setTagsList((prev: Tag[]) => [...prev, tag]);
    setNewTag("");
  }
  const tagWatcher: string | undefined = watch("tag");
  useEffect(() => {
    setNewTag(watch("tag"));
  }, [setNewTag, tagWatcher, watch]);

  return (
    <>
      <Head />
      <div className={style.wrapper}>
        <div className={style.post}>
          <Box
            component="form"
            sx={{ m: "auto", width: "80%" }}
            noValidate
            autoComplete="off"
            className={style.post__inputs}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="outlined-textarea"
              label="Title"
              placeholder="Title"
              multiline
              inputProps={{
                maxLength: 50,
              }}
              className={style.post__inputs__title}
              {...register("title", { required: true })}
              defaultValue=""
            />
            <TextField
              id="outlined-textarea"
              label="Preview"
              placeholder="Preview"
              multiline
              inputProps={{
                maxLength: 250,
              }}
              className={style.post__inputs__preview}
              {...register("preview", { required: true })}
              defaultValue=""
            />
            <TextField
              id="outlined-textarea"
              className={style.post__inputs__content}
              label="Content"
              placeholder="Content"
              multiline
              {...register("content", { required: true })}
              defaultValue=""
            />
            <div className={style.post__inputs__tags}>
              <div className={style.inputs__tags__container}>
                {tagsList.map((tag: Tag) => {
                  return tag.content;
                })}
              </div>
              <div className={style.inputs__tags__ctrl}>
                <TextField
                  label="With normal TextField"
                  id="filled-start-adornment"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    ),
                  }}
                  value={newTag}
                  {...register("tag")}
                />
                <Button
                  variant="contained"
                  endIcon={<Add />}
                  onClick={() => (newTag ? tagCreator(newTag) : null)}
                >
                  Add tag
                </Button>
              </div>
            </div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
});

export default AdminPostForm;
