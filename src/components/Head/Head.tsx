import React, { FC, useEffect, useRef, useState } from "react";
import style from "./Head.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane, FaSearch } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import Button from "../../Elements/Button";
import StandWithUkr from "./../../Elements/StandWithUkr";
import { Link, useLocation } from "react-router-dom";
import LoadingLinkToHome from "../../Elements/LoadingAnimationLogo/LoadingLinkToHome";

const PanelShifter = (panel: HTMLDivElement) => {
  if (window.scrollY > 60 && panel) {
    panel.style.top = 0 + "px";
  }
  if (window.scrollY <= 60 && panel) {
    panel.style.top = 60 - window.scrollY + "px";
  }
};

const Head: FC<{}> = () => {
  const locate = useLocation();

  let logoAnimationStart: (() => void) | null = null;

  const panel = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 440);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    logoAnimationStart && logoAnimationStart();

    window.addEventListener("scroll", (e: Event) => {
      panel.current && PanelShifter(panel.current);
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
        <LoadingLinkToHome
          text="PT-BLOG"
          start={(startCallBack) => {
            logoAnimationStart = startCallBack;
          }}
          linkTo="/"
          durationMS={1200}
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
          <div className={style.panel__right__mobile}>
            {isMobileMenuOpen ? (
              <>
                <div className={style.mobile__blurBg} />
                <div className={style.mobile__menu}>
                  <div
                    className={style.mobile__menu__btn}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    HIDE
                    <MdArrowForwardIos />
                  </div>
                  <div className={style.mobile__menu__routes}>
                    <div className={style.route}>
                      <Link className={style.route} to={"/"}>
                        <Button isSelected={locate.pathname === "/"}>
                          Home
                        </Button>
                      </Link>
                    </div>
                    <div className={style.route}>
                      <Link className={style.route} to={"/about"}>
                        <Button isSelected={locate.pathname === "/about"}>
                          About
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className={style.mobile__menu__links}>
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
                </div>
              </>
            ) : (
              <div
                className={style.mobile__btn}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                MENU
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Head;
