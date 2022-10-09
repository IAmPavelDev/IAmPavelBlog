import React, { FC, useReducer, useState } from "react";
import style from "./Post.module.scss";
import _ from "lodash";
import { Box, Button, TextField } from "@mui/material";
import store from "../../../state/store";
import { IUpdatePost } from "../../../state/types";
import { FcCollapse } from "react-icons/fc";

type stateData = { content: string; title: string; postId?: string };
type stateKey = keyof stateData;

const Post: FC<
    {
        contentEditable: boolean;
        parentId: string;
        parentStyle: { readonly [key: string]: string };
    } & stateData
> = ({
    content,
    title,
    contentEditable = false,
    postId,
    parentId,
    parentStyle,
}) => {
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
        (state: stateData, action: { type: string; payload?: string }) => {
            switch (action.type) {
                case "title": {
                    if (!action.payload) return state;
                    const newState = { ...state, title: action.payload };
                    checkIsNew(newState);
                    return newState;
                }
                case "content": {
                    if (!action.payload) return state;
                    const newState = { ...state, content: action.payload };
                    checkIsNew(newState);
                    return newState;
                }
                case "reset": {
                    setIsNew(false);
                    return initial;
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

    return (
        <div
            className={
                isFull
                    ? style.wrapper + " " + style.wrapper__full
                    : style.wrapper + " " + style.wrapper__preview
            }
            onClick={() => {
                if (!isFull) {
                    setIsFull(true);
                    document
                        .getElementById(parentId)
                        ?.classList.add(parentStyle.wrapper__post__full);
                }
            }}
        >
            {contentEditable && isFull ? (
                <Box className={style.textBox}>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        inputProps={{
                            maxLength: 50,
                        }}
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
                        id="standard-multiline-static"
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
                    <div className={style.ctrl__btns}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                document
                                    .getElementById(parentId)
                                    ?.classList.remove(
                                        parentStyle.wrapper__post__full
                                    );
                                setIsFull((prev) => !prev);
                            }}
                        >
                            Collapse
                        </Button>
                        {isNew ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={updateData}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        dispatch({ type: "reset" });
                                    }}
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
                    <div
                        className={style.wrapper__content}
                        defaultValue={state.content}
                    >
                        {state.content}
                    </div>
                    {isFull ? (
                        <div
                            className={style.textBox__collapse}
                            onClick={() => {
                                document
                                    .getElementById(parentId)
                                    ?.classList.remove(
                                        parentStyle.wrapper__post__full
                                    );
                                setIsFull((prev) => !prev);
                            }}
                        >
                            <FcCollapse className={style.textBox__collapse__icon} />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default Post;
