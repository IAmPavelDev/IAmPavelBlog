import React, { FC, useEffect, useState } from "react";
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

  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 440);

  useEffect(() => {
    startLoader();
    window.addEventListener("resize", () => {
      // if (window.innerWidth > 440 !== isMenuOpen) {
      //   setIsMenuOpen(window.innerWidth > 440);
      // }
    });
  });

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__standImg}>
        <StandWithUkr />
      </div>
      <div className={style.wrapper__panel}>
        <LoadingLinkToHome
          className={style.panel__logo}
          text="PT-BLOG"
          start={(start) => {
            startLoader = start;
          }}
        />
        {isDesktop ? (
          <div className={style.panel__right}>
            <Link className={style.panel__route} to={"/"}>
              <Button isSelected={locate.pathname === "/"}>Home</Button>
            </Link>
            <Link className={style.panel__route} to={"/about"}>
              <Button isSelected={locate.pathname === "/about"}>About</Button>
            </Link>
            <p className={style.panel__spacer}>|</p>
            <a
              target={"_blank"}
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              href="https://github.com/IAmPavelDev"
            >
              <AiFillGithub className={style.panel__link} />
            </a>
            <a
              target={"_blank"}
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              href="https://t.me/g3t_P4v3l"
            >
              <FaTelegramPlane className={style.panel__link} />
            </a>
            <p className={style.panel__spacer}>|</p>
            <div className={style.panel__link}>
              <FaSearch />
            </div>
          </div>
        ) : (
          <div>Open</div>
        )}
      </div>
    </div>
  );
};

export default Head;
