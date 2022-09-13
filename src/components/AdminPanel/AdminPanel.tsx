import React, { FC } from "react";
import Head from "../Head/Head";
import style from "./AdminPanel.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import PostsStore from "./../../state/store";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

type Inputs = {
    title: string;
    content: string;
    tags?: string[];
};

const AdminPanel: FC<{}> = observer(() => {
    const onSubmit = (data: Inputs) => console.log(data);
    console.log(PostsStore.posts);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    console.log(watch("title"));
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
                            {...(register("title"))}
                        />
                        <TextField
                            id="outlined-textarea"
                            className={style.post__inputs__content}
                            label="Content"
                            placeholder="Content"
                            multiline
                            {...(register("content"))}
                        />
                        <div className={style.post__inputs__tags}>
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
                                {...register("tags")}
                            />
                            <Button variant="contained" endIcon={<Add />}>
                                Add
                            </Button>
                        </div>
                        {errors.tags && <p>Ok</p>}
                        {errors.content && <p>Ok2</p>}
                        <input type="submit" />
                    </Box>
                    <div className={style.post__btns}></div>
                </div>
            </div>
        </>
    );
});

export default AdminPanel;
