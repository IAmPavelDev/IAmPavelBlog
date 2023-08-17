import style from "./Edit.module.scss";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Create } from "../Create";
import { store } from "shared/store";
import { PostPreview } from "features/PostList/PostPreview";
import { deletePost } from "shared/api/posts/delete-post";
import { ITag } from "shared/types";
import { fetchTags } from "shared/api/tags/fetchTags";
import TagCard from "shared/ui/TagCard";
import { deleteTag } from "shared/api/tags/deleteTag";

export const Edit = () => {
  const [postId, setPostId] = useState<string>();

  const [postsStatus, setPostsStatus] = useState<"ok" | "loading" | "error">(
    "ok"
  );

  const [tags, setTags] = useState<{
    data: ITag[];
    status: "" | "loading" | "ok" | "error";
  }>({ data: [], status: "" });

  const [postsIdsToEdit, setPostsIdsToEdit] = useState<string[]>(
    store.postStore.getPostsIdsToDisplay
  );

  const loadMorePosts = () => {
    setPostsStatus("loading");
    store.postStore
      .load(store.postStore.getCurrentFetchingState.lastFetchedPage + 1)
      .then(() => {
        setPostsIdsToEdit(store.postStore.getPostsIdsToDisplay);
        setPostsStatus("ok");
      })
      .catch((err) => setPostsStatus("error"));
  };

  useEffect(() => {
    if (tags.status === "") {
      setTags({ data: [], status: "loading" });
      fetchTags("")
        .then((t: ITag[]) => {
          setTags({ data: t, status: "ok" });
        })
        .catch((err) => setTags({ data: [], status: "error" }));
    }
  });
  if (!postId) {
    return (
      <div className={style.wrapper}>
        {postsStatus === "loading" && <>Loading...</>}
        {postsStatus === "error" && <>Error while posts fetching</>}
        {postsStatus === "ok" &&
          store.postStore.getPostsIdsToDisplay.map((id: string) => {
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
                        .then((postId) => alert("post: " + postId + " deleted"))
                        .catch((err) => console.log(err));
                    }
                  }}
                >
                  Delete
                </Button>
              </Box>
            );
          })}
        <Box>
          <Button variant="contained" onClick={loadMorePosts}>
            Load more posts
          </Button>
        </Box>
        <hr />
        {tags.status === "loading" && <>Loading tags...</>}
        {tags.status === "error" && <>Error while fetching tags</>}
        {tags.status === "ok" &&
          tags.data.map((tag: ITag) => (
            <Box key={tag.id}>
              <TagCard type="dark" text={tag.content} id={tag.id} />
              <Button
                variant="contained"
                onClick={() => {
                  deleteTag(tag.id).then((tagId: string) =>
                    setTags((prev) => ({
                      data: prev.data.filter((t: ITag) => tag.id !== t.id),
                      status: "ok",
                    }))
                  );
                }}
              >
                Del
              </Button>
              <hr />
            </Box>
          ))}
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
