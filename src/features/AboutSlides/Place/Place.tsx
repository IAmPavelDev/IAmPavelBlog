import style from "./Place.module.scss";
import { useEffect, useRef } from "react";

export const Place = () => {
  const first = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
      if (first.current) {
        first.current.style.transform =
          "scale(" + (1000 - window.scrollY) / 1000 + ")";
      }
    });
  });
  return (
    <div className={style.wrapper} ref={first}>
      <div className={style.wrapper__left}></div>
      <div className={style.wrapper__right}>
        Hi, I'm Paul Tkachenko, frontend developer from Odesa, Ukraine.
      </div>
    </div>
  );
};
