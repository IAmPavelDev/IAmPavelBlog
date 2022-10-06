import React, { FC, useReducer, useState } from "react";
import style from "./Post.module.scss";
import * as _ from "lodash";

type stateData = { content: string; title: string };

const Post: FC<
    {
        contentEditable: boolean;
    } & stateData
> = ({ content, title, contentEditable = false }) => {
    const [isNew, setIsNew] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const initial: stateData = {
        content: content,
        title: title,
    };
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
                <>
                    <input
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                            dispatch({
                                type: "title",
                                payload: e.currentTarget.value,
                            })
                        }
                        className={style.wrapper__title}
                        value={state.title}
                    />
                    <input
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                            dispatch({
                                type: "content",
                                payload: e.currentTarget.value,
                            })
                        }
                        className={style.wrapper__content}
                        value={state.content}
                    />
                    {isNew ? <p>New data</p> : <></>}
                    <button
                        onClick={() => {
                            console.log(isFull);
                            setIsFull((prev) => !prev);
                        }}
                    >
                        Collapse
                    </button>
                </>
            ) : (
                <>
                    <div className={style.wrapper__title}>{state.title}</div>
                    <div className={style.wrapper__content}>{state.content}</div>
                </>
            )}
        </div>
    );
};

export default Post;
