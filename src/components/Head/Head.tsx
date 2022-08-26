import React, { FC } from "react";
import style from "./Head.module.scss";
import Button from "../../Elements/Button";

const Head: FC<{}> = () => {
    return (
        <div className={style.wrapper}>
            <Button>About</Button>
        </div>
    )
}

export default Head;