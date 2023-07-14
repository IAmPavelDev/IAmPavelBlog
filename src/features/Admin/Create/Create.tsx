import styles from "./Create.module.scss";
import { KeyboardEvent, useState, FC, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

import { store } from "shared/store";
import { IPost, ITag } from "shared/types";
import { TagsEditor } from "./TagsEditor";
import { createPost } from "shared/api/posts/create-posts";
import { Link } from "react-router-dom";
import { updatePost } from "shared/api/posts/update-posts";
import { Controller, useForm } from "react-hook-form";

type PostCreateForm = {
  title: string;
  preview: string;
  previewImage: string;
  previewImagePlaceholder: string;
  content: string;
  tags: ITag[];
};

function TabAbility(e: KeyboardEvent<HTMLDivElement>) {
  const textAreaElement = e.target as HTMLTextAreaElement;
  const { value } = textAreaElement;
  if (e.key === "Tab") {
    e.preventDefault();

    const cursorPosition = textAreaElement.selectionStart;
    const cursorEndPosition = textAreaElement.selectionEnd;

    (e.target as HTMLTextAreaElement).value =
      value.substring(0, cursorPosition) +
      "\t" +
      value.substring(cursorEndPosition);
    (e.target as HTMLTextAreaElement).selectionStart = cursorPosition + 1;
    (e.target as HTMLTextAreaElement).selectionEnd = cursorPosition + 1;
  }
}

const CreateForm: FC<{ defaultPostData?: IPost }> = ({ defaultPostData }) => {
  const { register, handleSubmit, control, watch } = useForm<PostCreateForm>({
    defaultValues: defaultPostData,
  });
  const [createdPostURL, setCreatedPostURL] = useState<
    string | "pending" | undefined
  >("");

  function uploadPost() {
    setCreatedPostURL("pending");
    const createdPost = store.postStore.adminCreatedPost;
    if (!!createdPost) {
      if (!defaultPostData?.postId) {
        createPost(createdPost).then((post: IPost) => {
          setCreatedPostURL(post.postId);
        });
        return;
      }
      updatePost(defaultPostData?.postId, createdPost).then((post: IPost) =>
        setCreatedPostURL(post.postId)
      );
    }
  }

  function pushActualData(actualPost: PostCreateForm) {
    store.postStore.adminNewPostSet(actualPost);
  }

  if (createdPostURL === undefined) {
    return <div>Error</div>;
  }

  if (createdPostURL === "pending") {
    return <div>Pending...</div>;
  }

  if (!!createdPostURL) {
    return (
      <Box>
        <Link to={"/post/" + createdPostURL}>Created post</Link>
        <Button onClick={() => setCreatedPostURL("")}>Reset</Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.wrapper}
      onSubmit={handleSubmit(pushActualData)}
    >
      <Controller
        render={({ field }) => {
          return (
            <TagsEditor
              defaultTags={field.value}
              pushTags={(newTags) => {
                field.onChange({ target: { value: newTags } });
              }}
            />
          );
        }}
        name="tags"
        control={control}
      />
      preview image link:
      <input
        type="text"
        {...register("previewImage", { required: true })}
        className={[styles.wrapper__field, styles.wrapper__innerField].join(
          " "
        )}
      />
      preview image placeholder link:
      <input
        type="text"
        {...register("previewImagePlaceholder", { required: true })}
        className={[styles.wrapper__field, styles.wrapper__innerField].join(
          " "
        )}
      />
      title:
      <TextField
        {...register("title", { required: true })}
        multiline
        className={styles.wrapper__field}
        minRows={2}
        inputProps={{
          className: styles.wrapper__innerField,
          maxLength: 50,
        }}
      />
      preview:
      <TextField
        {...register("preview", { required: true })}
        multiline
        className={styles.wrapper__field}
        minRows={2}
        inputProps={{
          className: styles.wrapper__innerField,
          maxLength: 150,
        }}
      />
      content:
      <TextField
        {...register("content", { required: true })}
        multiline
        className={styles.wrapper__field}
        minRows={20}
        inputProps={{
          className: styles.wrapper__innerField,
        }}
        onKeyDown={TabAbility}
      />
      <Button variant="contained" type="submit">
        Push to local
      </Button>
      <Button variant="contained" onClick={() => uploadPost()}>
        Save to server
      </Button>
    </Box>
  );
};

export const Create: FC<{ defaultPostId?: string }> = ({ defaultPostId }) => {
  const [defaultPostData, setDefaultPostData] = useState<
    IPost | "loading" | null
  >("loading");

  useEffect(() => {
    if (defaultPostData === "loading") {
      const recentData = store.postStore.adminCreatedPost;
      console.log(recentData);
      if (!!recentData) {
        setDefaultPostData(recentData);
      } else if (defaultPostId) {
        (async () => {
          const defaultPost = await store.postStore.loadPostById(defaultPostId);
          setDefaultPostData(defaultPost);
        })();
      } else {
        setDefaultPostData(null);
      }
    }
  });

  if (defaultPostData === "loading") {
    return <>Loading...</>;
  }

  if (!!defaultPostData) {
    return <CreateForm defaultPostData={defaultPostData} />;
  }

  return <CreateForm />;
};
