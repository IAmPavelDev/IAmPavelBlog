import React, { FC, ReactNode, useEffect, useState } from "react";
import Head from "../Head/Head";
import style from "./AdminPanel.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import PostsStore from "./../../state/store";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

type Inputs = {
    title: string;
    content: string;
    tag?: string;
};

type Tag = {
    content: ReactNode;
    tagWord: string;
    id: string;
};

const AdminPanel: FC<{}> = observer(() => {
    const [tagsList, setTagsList] = useState<Array<Tag>>([]);
    const [newTag, setNewTag] = useState<string>();
    const { register, handleSubmit, watch, reset } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        const tagsData = tagsList.map((tag: Tag) => {
            return { tagWord: tag.tagWord, id: tag.id };
        });
        PostsStore.addPosts({
            title: data.title,
            content: data.content,
            tags: tagsData,
        });
        reset();
        setTagsList([]);
    };

    function tagCreator(content: string) {
        const tagId = new Date().getTime().toString();
        const tag: Tag = {
            content: (
                <span key={tagId} className={style.tags__cards__badge}>
                    <Card>
                        <div
                            onClick={() => {
                                setTagsList((prev: Tag[]) => {
                                    return prev.filter(
                                        (tag: Tag) => tag.id !== tagId
                                    );
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
                <h1>Admin Panel</h1>
                <h2>Post some shit</h2>
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
                            className={style.post__inputs__title}
                            {...register("title", { required: true })}
                        />
                        <TextField
                            id="outlined-textarea"
                            className={style.post__inputs__content}
                            label="Content"
                            placeholder="Content"
                            multiline
                            {...register("content", { required: true })}
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
                                            <InputAdornment position="start">
                                                #
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={newTag}
                                    {...register("tag")}
                                />
                                <Button
                                    variant="contained"
                                    endIcon={<Add />}
                                    onClick={() =>
                                        newTag ? tagCreator(newTag) : null
                                    }
                                >
                                    Add tag
                                </Button>
                            </div>
                        </div>
                        <input type="submit" />
                    </Box>
                    <div className={style.post__btns}></div>
                </div>
            </div>
        </>
    );
});

export default AdminPanel;
