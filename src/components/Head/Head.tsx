import React, { FC, useEffect } from "react";
import style from "./Head.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane, FaSearch } from "react-icons/fa";
import Button from "../../Elements/Button";
import StandWithUkr from "./../../Elements/StandWithUkr";
import { Link, useLocation } from "react-router-dom";
import LoadingLinkToHome from "../../Elements/LoadingLinkToHome";

const Head: FC<{}> = () => {
  const locate = useLocation();
  let startLoader: () => void = () => {};

  useEffect(() => {
    startLoader();
  });

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__standImg}>
        <StandWithUkr />
      </div>
      <div className={style.wrapper__panel}>
        <LoadingLinkToHome
          className={style.panel__logo}
          text="Iampavel"
          start={(start) => {
            startLoader = start;
          }}
          delay={1000}
        />
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
            <a
              target={"_blank"}
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              href="https://github.com/IAmPavelDev"
            >
              <AiFillGithub className={style.panel__links__link} />
            </a>
            <a
              target={"_blank"}
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              href="https://t.me/g3t_P4v3l"
            >
              <FaTelegramPlane className={style.panel__links__link} />
            </a>
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
