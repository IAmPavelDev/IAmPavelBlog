import { motion } from "framer-motion";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createContext } from "vm";
import style from "./LoadingAnimationLogo.module.scss";

// const LogoStartAnimation = createContext(null);

export const LoadingLinkToHome: FC<{
  className?: string;
  durationMS?: number;
  delay?: number;
  start: (startCallBack: () => void) => void;
  text: string;
  linkTo?: string;
}> = ({ className, durationMS = 1000, delay = 500, start, text, linkTo }) => {
  const logoText = useRef<HTMLDivElement>(null);
  const logoTextInner = useRef<HTMLDivElement>(null);
  const logoBg = useRef<HTMLDivElement>(null);

  const isOpened = useRef<boolean>(false);
  const [, reload] = useState(false);

  const logoScrollCorrector = useCallback(() => {
    if (logoTextInner.current && window.scrollY > 60) {
      logoTextInner.current.style.transform = "translateY(61px)";
    }
    if (logoTextInner.current && window.scrollY <= 60) {
      logoTextInner.current.style.transform = `translateY(${
        window.scrollY + 1
      }px)`;
    }
  }, [logoTextInner]);

  useEffect(() => {
    start(() => {
      setTimeout(() => {
        logoBg.current &&
          logoBg.current.classList.add(style.panel__logo__bg_open);
        logoText.current &&
          logoText.current.classList.add(style.panel__logo__text_open);
        logoTextInner.current &&
          logoTextInner.current.classList.add(style.panel__text__inner);
        setTimeout(() => {
          isOpened.current = true;
          reload(true);
        }, durationMS);
      }, delay);
    });

    if (logoTextInner.current && logoText.current && logoBg.current) {
      logoBg.current.style.animationDuration = durationMS + "ms";
      logoText.current.style.animationDuration = durationMS + "ms";
      logoTextInner.current.style.animationDuration = durationMS + "ms";

      const logoPosition = logoText.current.getBoundingClientRect();

      if (!logoText.current.style.transform)
        logoText.current.style.transform = `translateX(calc(50vw - (50% + ${logoPosition.left}px)))
    translateY(calc(50vh - (50% + ${logoPosition.top}px)))`;
    }

    window.addEventListener("scroll", logoScrollCorrector);
    return () => {
      window.removeEventListener("scroll", logoScrollCorrector);
    };
  });

  return (
    <>
      {linkTo && isOpened.current ? (
        <Link className={[className, style.wrapper].join(" ")} to={linkTo}>
          <div
            className={[
              style.panel__logo__bg,
              style["panel__logo__bg-static"],
            ].join(" ")}
          ></div>
          <div
            className={[
              style.panel__logo__text,
              style["panel__logo__text-static"],
            ].join(" ")}
          >
            <div className={style["panel__text__inner-static"]}>{text}</div>
          </div>
        </Link>
      ) : (
        <div className={[className, style.wrapper].join(" ")}>
          <div ref={logoBg} className={style.panel__logo__bg}></div>
          <div ref={logoText} className={[style.panel__logo__text].join(" ")}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={logoTextInner}
            >
              {text}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
