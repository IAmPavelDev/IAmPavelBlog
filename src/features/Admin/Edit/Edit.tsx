import style from "./Edit.module.scss";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Create } from "../Create";
import { store } from "shared/store";
import PostPreview from "features/PostList/PostPreview/PostPreview";
import { deletePost } from "shared/api/posts/delete-post";

export const Edit = () => {
  const [postId, setPostId] = useState<string>();

  if (!postId) {
    return (
      <div className={style.wrapper}>
        {store.postStore.getPostsIdsToDisplay.map((id: string) => {
          return (
            <Box key={id} className={style.blog__post}>
              <PostPreview postId={id} />
              <Button variant="contained" onClick={() => setPostId(id)}>
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  const res = confirm("R u sure?");
                  if (res) {
                    deletePost(id)
                      .then((postId) =>
                        console.log("post: " + postId + " deleted")
                      )
                      .catch((err) => console.log(err));
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </div>
    );
  }
  return (
    <div className={style.wrapper}>
      <Box className={style.wrapper}>
        <Button
          variant="contained"
          onClick={() => {
            setPostId("");
          }}
        >
          Reset
        </Button>
        <Create defaultPostId={postId} />
      </Box>
    </div>
  );
};
