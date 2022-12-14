import React, { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styled from "styled-components";
import { login } from "./../../server/login";
import { setTokenRefresh } from "../../server/token-refresh";

type AdminLogin = {
    login: string;
    password: string;
};

const LoginFormBlock = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-items: center;
        input {
            width: 85%;
            padding-right: 30px;
        }
        Button {
            width: 100px;
            margin: 0 auto;
        }
    }
`;

const PasswordBlock = styled.div`
    position: relative;
    .icon {
        right: 8px;
        top: calc(50% - 8px);
        position: absolute;
        width: 16px;
        height: 16px;
        cursor: pointer;
        z-index: 2;
    }
    .field {
        z-index: 1;
        width: 100%;
    }
`;

const AdminAuth: FC<{ loggedIn: () => void }> = ({ loggedIn }) => {
    const { register, handleSubmit, reset } = useForm<AdminLogin>();
    const [pwdShow, setPwdShow] = useState<Boolean>(false);

    async function onSubmit(data: AdminLogin) {
        const result = await login(data);
        if (result?.status === 200) {
            setTokenRefresh();
            loggedIn();
        }
        reset();
    }

    return (
        <LoginFormBlock>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...register("login", { required: true })}
                    id="outlined-textarea lgn"
                    label="Login"
                    placeholder="Login"
                    className="field"
                    defaultValue=""
                />
                <PasswordBlock>
                    <div onClick={() => setPwdShow(!pwdShow)} className="icon">
                        {pwdShow ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                    <Box>
                        <TextField
                            {...register("password", { required: true })}
                            type={pwdShow ? "text" : "password"}
                            id="outlined-textarea pwd"
                            label="Password"
                            placeholder="Password"
                            className="field"
                            defaultValue=""
                        />
                    </Box>
                </PasswordBlock>
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </Box>
        </LoginFormBlock>
    );
};

export default AdminAuth;
