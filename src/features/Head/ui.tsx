import React, { FC, useEffect, useRef, useState } from "react";
import style from "./Head.module.scss";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as AiFillGithub } from "shared/icons/AiFillGithub.svg";
import { ReactComponent as MdArrowForwardIos } from "shared/icons/MdArrowForwardIos.svg";
import { ReactComponent as FaTelegramPlane } from "shared/icons/FaTelegramPlane.svg";
import { ReactComponent as FaSearch } from "shared/icons/FaSearch.svg";

import MenuLink from "./MenuLink";
import StandWithUkr from "./StandWithUkraineBadge";
import { LoadingLinkToHome } from "./LoadingLinkToHome";

const PanelShifter = (panel: HTMLDivElement) => {
  if (window.scrollY > 60 && panel) {
    panel.style.top = 0 + "px";
  }
  if (window.scrollY <= 60 && panel) {
    panel.style.top = 60 - window.scrollY + "px";
  }
};

function useHideMobilePanelActuator(
  hideSetState: (isDisplayed: boolean) => void,
  durationMS: number,
  toHideAnimationClass: string,
  toShowAnimationClass: string,
  toHideStatic: string,
  toShowStatic: string
) {
  return (
    menuPanelElement: HTMLDivElement | null,
    mode: "hide" | "display"
  ) => {
    if (!menuPanelElement) {
      console.error("can't find mobile panel node");
      return;
    }
    Array.from(menuPanelElement.children).forEach((element) => {
      (element as HTMLElement).style.animationDuration = durationMS + "ms";
    });
    if (mode === "hide") {
      menuPanelElement.classList.add(toHideAnimationClass);
      setTimeout(() => {
        menuPanelElement.classList.remove(toHideAnimationClass);
        menuPanelElement.classList.add(toHideStatic);
        hideSetState(false);
      }, durationMS);
    }
    if (mode === "display") {
      hideSetState(true);
      menuPanelElement.classList.remove(toShowStatic);
      menuPanelElement.classList.remove(toHideStatic);
      menuPanelElement.classList.add(toShowAnimationClass);
      setTimeout(() => {
        menuPanelElement.classList.remove(toShowAnimationClass);
        menuPanelElement.classList.add(toShowStatic);
      }, durationMS);
    }
  };
}

export const Head: FC<{}> = () => {
  const locate = useLocation();

  let logoAnimationStart: (() => void) | null = null;

  const panel = useRef<HTMLDivElement>(null);

  const mobilePanel = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 440);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const HideMobilePanelActuator = useHideMobilePanelActuator(
    setIsMobileMenuOpen,
    600,
    style.hideMobilePanelAnimation,
    style.displayMobilePanelAnimation,
    style.hideMobilePanelStatic,
    style.displayMobilePanelStatic
  );

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
          text="IAmPaul"
          start={(startCallBack) => {
            logoAnimationStart = startCallBack;
          }}
          linkTo="/"
          durationMS={1200}
          delay={1000}
        />
        {isDesktop ? (
          <div className={style.panel__right}>
            <Link className={style.panel__route} to={"/"}>
              <MenuLink isSelected={locate.pathname === "/"}>Home</MenuLink>
            </Link>
            <Link className={style.panel__route} to={"/about"}>
              <MenuLink isSelected={locate.pathname === "/about"}>
                About me
              </MenuLink>
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
            <Link to={"/search"} className={style.panel__link}>
              <FaSearch />
            </Link>
          </div>
        ) : (
          <div ref={mobilePanel} className={style.panel__right__mobile}>
            {isMobileMenuOpen ? (
              <>
                <div className={style.mobile__blurBg} />
                <div className={style.mobile__menu}>
                  <div
                    className={style.mobile__menu__btn}
                    onClick={() =>
                      HideMobilePanelActuator(mobilePanel.current, "hide")
                    }
                  >
                    HIDE
                    <MdArrowForwardIos />
                  </div>
                  <div className={style.mobile__menu__routes}>
                    <Link className={style.route} to={"/"}>
                      <MenuLink isSelected={locate.pathname === "/"}>
                        Home
                      </MenuLink>
                    </Link>
                    <Link className={style.route} to={"/about"}>
                      <MenuLink isSelected={locate.pathname === "/about"}>
                        About
                      </MenuLink>
                    </Link>
                    <hr />
                    <Link className={style.route} to={"/about"}>
                      <MenuLink isSelected={locate.pathname === "/search"}>
                        Search
                      </MenuLink>
                    </Link>
                  </div>
                  <div className={style.mobile__menu__links}>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://github.com/IAmPavelDev"
                    >
                      <AiFillGithub className={style.link} />
                    </a>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://t.me/g3t_P4v3l"
                    >
                      <FaTelegramPlane className={style.link} />
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div
              className={style.mobile__btn}
              onClick={() =>
                HideMobilePanelActuator(mobilePanel.current, "display")
              }
            >
              MENU
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
