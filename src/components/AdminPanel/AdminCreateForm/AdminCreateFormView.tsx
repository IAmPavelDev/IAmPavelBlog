import React, { FC, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { Add } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, Tooltip } from "@mui/material";

import style from "./AdminCreateForm.module.scss";
import CompleteEditor from "./CompleteEditor";

import { PostCreateForm, Tag } from "./types";

const AdminCreateFormView: FC<{
  handleSubmit: UseFormHandleSubmit<PostCreateForm>;
  register: UseFormRegister<PostCreateForm>;
  onSubmit: (post: PostCreateForm) => void;
  previewImage: string;
  setPreviewImage: (imageUrl: string) => void;
  setContentData: (data: string) => void;
  tagsList: Array<Tag>;
  tagCreator: (tag: string) => void;
}> = ({
  handleSubmit,
  onSubmit,
  register,
  previewImage,
  setPreviewImage,
  setContentData,
  tagsList,
  tagCreator,
}) => {
  let previewImageCollector: string = "";
  const [newTag, setNewTag] = useState<string>("");
  return (
    <>
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
            {previewImage ? (
              <Tooltip title="Click to delete preview image" followCursor>
                <img
                  src={previewImage}
                  alt="preview"
                  onClick={() => setPreviewImage("")}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            ) : (
              <>
                <TextField
                  id="outlined-textarea"
                  placeholder="Image url"
                  multiline
                  className={style.post__inputs__preview__image__url}
                  onChange={(e) =>
                    (previewImageCollector = e.currentTarget.value)
                  }
                  defaultValue=""
                  type={"url"}
                />
                <Button
                  component="span"
                  onClick={() => setPreviewImage(previewImageCollector)}
                >
                  Add preview image
                </Button>
              </>
            )}
            <CompleteEditor setContentData={setContentData} />
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
                  onChange={(e) => setNewTag(e.currentTarget.value)}
                  value={newTag}
                />
                <Button
                  variant="contained"
                  endIcon={<Add />}
                  onClick={() => {
                    if (newTag) {
                      tagCreator(newTag);
                      setNewTag("");
                    }
                  }}
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
};

export default AdminCreateFormView;
