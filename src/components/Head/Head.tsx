import React, { FC } from "react";
import style from "./Head.module.scss";
import Button from "../../Elements/Button";
import StandWithUkr from "./../../Elements/StandWithUkr";
import { Link } from "react-router-dom";

const Head: FC<{}> = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper__standImg}>
                <StandWithUkr />
            </div>
            <div className={style.wrapper__links}>
                <Link className={style.wrapper__link} to={"/"}>
                    <Button>About</Button>
                </Link>

                <Link className={style.wrapper__link} to={"/blog"}>
                    <Button>Blog</Button>
                </Link>
            </div>
        </div>
    );
};

export default Head;
