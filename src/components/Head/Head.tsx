import React, { FC } from "react";
import style from "./Head.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane, FaSearch } from "react-icons/fa";
import Button from "../../Elements/Button";
import StandWithUkr from "./../../Elements/StandWithUkr";
import { Link, useLocation } from "react-router-dom";

const Head: FC<{}> = () => {
  const locate = useLocation();
  console.log();

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__standImg}>
        <StandWithUkr />
      </div>
      <div className={style.wrapper__panel}>
        <Link to="/" className={style.panel__logo}>
          BLOG
        </Link>
        <div className={style.panel__right}>
          <div className={style.panel__routes}>
            <Link className={style.panel__routes__route} to={"/"}>
              <Button isSelected={locate.pathname === "/"}>Home</Button>
            </Link>
            <Link className={style.panel__routes__route} to={"/about"}>
              <Button isSelected={locate.pathname === "/about"}>About</Button>
            </Link>
          </div>
          <p className={style.panel__spacer}>|</p>
          <div className={style.panel__links}>
            <AiFillGithub className={style.panel__links__link} />
            <FaTelegramPlane className={style.panel__links__link} />
          </div>
          <p className={style.panel__spacer}>|</p>
          <div className={style.panel__search__btn}>
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
