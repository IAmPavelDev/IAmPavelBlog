import React, { FC, useReducer, useState } from "react";
import style from "./Post.module.scss";
import _ from "lodash";
import { Box, Button, TextField } from "@mui/material";
import store from "../../../state/store";
import { IPost, IPostKey, ITag, IUpdatePost } from "../../../types";
import { FcCollapse } from "react-icons/fc";
import postReducer from "./postReducer";
import Tag from "../../../Elements/Tag";

const Tags = (tags?: ITag[]) => {
  const preventor = (e: WheelEvent) => e.preventDefault();
  let scrollBuffer = 0;
  let possibleToScroll: number = 0;
  const tagCollector = tags ? (
    <>
      <div
        onMouseOver={() => {
          document.addEventListener("wheel", preventor, {
            passive: false,
          });
        }}
        onMouseOut={() => {
          document.removeEventListener("wheel", preventor);
        }}
        onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
          if (!possibleToScroll) {
            possibleToScroll =
              e.currentTarget.clientWidth - e.currentTarget.scrollWidth;
          }
          if (
            possibleToScroll < 0 &&
            scrollBuffer <= 0 &&
            scrollBuffer >= possibleToScroll - 20
          ) {
            scrollBuffer =
              e.deltaY > 0
                ? scrollBuffer - 20 >= possibleToScroll - 20
                  ? scrollBuffer - 20
                  : scrollBuffer
                : scrollBuffer === 0
                ? scrollBuffer
                : scrollBuffer + 20;
            e.currentTarget.style.transform = `translateX(${scrollBuffer}px)`;
          }
        }}
        className={style.textBox__tags}
      >
        {tags.map((tag: { tagWord: string; id: string }) => {
          return (
            <div
              key={tag.id}
              onClick={() => store.searchByTag(tag)}
              className={style.tags__tag}
            >
              <Tag tagData={tag.tagWord} />
            </div>
          );
        })}
      </div>

      <div>scroll</div>
    </>
  ) : (
    <></>
  );
  return tagCollector;
};

const Post: FC<
  {
    contentEditable: boolean;
    parentId: string;
    parentStyle: { readonly [key: string]: string };
  } & IPost
> = ({
  title,
  tags,
  preview,
  contentEditable = false,
  postId,
  previewImage,
  parentId,
  parentStyle,
}) => {
  const [isNew, setIsNew] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [initial, setInitial] = useState<IPost>({
    title,
    postId,
    preview,
    tags,
    previewImage,
  });

  function checkIsNew(newState: IPost) {
    if (_.isEqual(initial, newState)) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }
  }

  const [state, dispatch] = useReducer(
    postReducer(initial, checkIsNew),
    initial
  );

  function stateAction(type: string, data?: string) {
    data
      ? dispatch({
          type: type,
          payload: data,
        })
      : dispatch({ type });
  }

  function updateData() {
    const updated: IUpdatePost = {};
    for (const [key, value] of Object.entries(state)) {
      if (value !== initial[key as IPostKey]) {
        updated[key as IPostKey] = value;
      }
    }
    setInitial(state);
    if (!Object.keys(updated).length) {
      console.error("Nothing to update");
      return;
    }
    if (!postId) {
      console.error("PostId not specified");
      return;
    }
    store.updatePosts(postId, updated);
    setIsNew(false);
  }

  async function loadContent() {
    if (!state.postId) {
      console.error("postId not provided");
      return;
    }
    dispatch({
      type: "load content",
      payload: await store.loadContent(state.postId),
    });
  }

  function changeFullMode(mode: string) {
    if (mode === "open") {
      if (!isFull) {
        document
          .getElementById(parentId)
          ?.classList.add(parentStyle.wrapper__post__full);
        loadContent();
        setIsFull(true);
      }
    }
    if (mode === "close") {
      document
        .getElementById(parentId)
        ?.classList.remove(parentStyle.wrapper__post__full);
      setIsFull((prev) => !prev);
    }
  }

  return (
    <div
      className={
        isFull
          ? style.wrapper + " " + style.wrapper__full
          : style.wrapper + " " + style.wrapper__preview
      }
    >
      {contentEditable && isFull ? (
        <Box className={style.textBox}>
          <TextField
            id="standard-multiline-static"
            multiline
            inputProps={{
              maxLength: 50,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              stateAction("title", e.target.value)
            }
            className={style.wrapper__title}
            value={state.title}
          />
          <TextField
            id="standard-multiline-static"
            multiline
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              stateAction("content", e.target.value)
            }
            className={style.wrapper__content}
            value={state.content}
          />
          <div className={style.ctrl__btns}>
            <Button variant="contained" onClick={() => changeFullMode("close")}>
              Collapse
            </Button>
            {isNew ? (
              <>
                <Button variant="contained" onClick={updateData}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  onClick={() => stateAction("reset")}
                >
                  Reset
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button
              variant="contained"
              onClick={() => {
                postId
                  ? store.deletePost(postId)
                  : console.error("PostId not specified");
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      ) : (
        <div className={style.textBox}>
          <div className={style.wrapper__title}>{state.title}</div>
          <div className={style.wrapper__content} defaultValue={state.preview}>
            {isFull ? state.content : state.preview}
          </div>
          <div>{Tags(state.tags)}</div>
          {isFull ? (
            <div
              className={style.textBox__collapse}
              onClick={() => changeFullMode("close")}
            >
              <FcCollapse className={style.textBox__collapse__icon} />
            </div>
          ) : (
            <div
              className={style.textBox__open}
              onClick={() => changeFullMode("open")}
            >
              <FcCollapse className={style.textBox__open__icon} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
