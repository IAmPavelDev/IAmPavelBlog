import React, { FC, useReducer, useState } from "react";
import style from "./Post.module.scss";
import _ from "lodash";
import { Box, TextField } from "@mui/material";
import store from "../../../state/store";
import { IUpdatePost } from "../../../state/types";

type stateData = { content: string; title: string; postId?: string };
type stateKey = keyof stateData;

const Post: FC<
    {
        contentEditable: boolean;
    } & stateData
> = ({ content, title, contentEditable = false, postId }) => {
    const [isNew, setIsNew] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [initial, setInitial] = useState<stateData>({
        content: content,
        title: title,
        postId: postId,
    });

    function checkIsNew(newState: stateData) {
        if (_.isEqual(initial, newState)) {
            setIsNew(false);
        } else {
            setIsNew(true);
        }
    }
    const [state, dispatch] = useReducer(
        (state: stateData, action: { type: string; payload: string }) => {
            switch (action.type) {
                case "title": {
                    const newState = { ...state, title: action.payload };
                    checkIsNew(newState);
                    return newState;
                }
                case "content": {
                    const newState = { ...state, content: action.payload };
                    checkIsNew(newState);
                    return newState;
                }
                default:
                    return state;
            }
        },
        initial
    );

    function updateData() {
        const updated: IUpdatePost = {};
        for (const [key, value] of Object.entries(state)) {
            if (value !== initial[key as stateKey]) {
                updated[key as stateKey] = value;
            }
        }
        setInitial(state);
        console.log(initial, state, updated);
        Object.keys(updated).length
            ? postId
                ? store.updatePosts(postId, updated)
                : console.error("PostId not specified")
            : console.error("Nothing to update");
    }

    return (
        <div
            className={
                isFull
                    ? style.wrapper + " " + style.wrapper__full
                    : style.wrapper + " " + style.wrapper__preview
            }
            onClick={() => (isFull ? null : setIsFull(true))}
        >
            {contentEditable && isFull ? (
                <Box className={style.textBox}>
                    <TextField
                        id="outlined-textarea"
                        multiline
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch({
                                type: "title",
                                payload: e.target.value,
                            });
                        }}
                        className={style.wrapper__title}
                        value={state.title}
                    />
                    <TextField
                        id="outlined-textarea"
                        multiline
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch({
                                type: "content",
                                payload: e.target.value,
                            });
                        }}
                        className={style.wrapper__content}
                        value={state.content}
                    />
                    {isNew ? <p>New data</p> : <></>}
                    <button
                        onClick={() => {
                            setIsFull((prev) => !prev);
                        }}
                    >
                        Collapse
                    </button>
                    <button onClick={updateData}>Update</button>
                    <button
                        onClick={() => {
                            postId
                                ? store.deletePost(postId)
                                : console.error("PostId not specified");
                        }}
                    >
                        Delete
                    </button>
                </Box>
            ) : (
                <>
                    <div className={style.wrapper__title}>{state.title}</div>
                    <div className={style.wrapper__content}>
                        {state.content}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
