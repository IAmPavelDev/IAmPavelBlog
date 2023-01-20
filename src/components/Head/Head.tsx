import React, { FC, useEffect, useRef, useState } from "react";
import style from "./Head.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane, FaSearch } from "react-icons/fa";
import Button from "../../Elements/Button";
import StandWithUkr from "./../../Elements/StandWithUkr";
import { Link, useLocation } from "react-router-dom";

const ANIMATION_LOADING_DELAY = 1000;

const Head: FC<{}> = () => {
  const locate = useLocation();
  let startLoader: () => void = () => {};

  const panel = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 440);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isLoaded = useRef<boolean>(false);

  useEffect(() => {
    startLoader();

    setTimeout(() => (isLoaded.current = true), ANIMATION_LOADING_DELAY);
    const logo = panel.current && (panel.current.children[0] as HTMLDivElement);
    setTimeout(() => {
      logo?.classList.add(style.panel__logo__open);
      logo?.children[0].classList.add(style.panel__logo__text__open);
    }, 500);

    window.addEventListener("scroll", (e: Event) => {
      if (window.scrollY > 60 && panel.current) {
        panel.current.style.top = 0 + "px";
        if (logo?.className.includes(style.panel__logo)) {
          logo.style.top = 0 + "px";
        }
      }
      if (window.scrollY <= 60 && panel.current) {
        panel.current.style.top = 60 - window.scrollY + "px";
        if (logo?.className.includes(style.panel__logo)) {
          logo.style.top = window.scrollY - 60 + "px";
        }
      }
    });
    window.addEventListener("resize", (e: UIEvent) => {
      if (!isDesktop && window.innerWidth > 530) {
        setIsDesktop(true);
      }
      if (isDesktop && window.innerWidth <= 530) {
        setIsDesktop(false);
      }
    });
  });

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__standImg}>
        <StandWithUkr />
      </div>
      <div className={style.wrapper__panel} ref={panel}>
        <div className={style.panel__logo}>
          <div className={style.panel__logo__text}>PT-BLOG</div>
        </div>
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
          <div className={style.panel__right__mobile}>
            {isMobileMenuOpen ? (
              <div></div>
            ) : (
              <div className={style.mobile__btn}>MENU</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Head;
