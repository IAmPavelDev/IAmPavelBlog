import { useRef, useEffect } from "react";
import style from "./Exp.module.scss";

export const Exp = () => {
  const exp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);

      if (exp.current) {
        if (window.scrollY < 1200) {
          exp.current.style.transform = `translateY(${
            (1200 - window.scrollY) / 10
          }%) scale(${-0.000209 * window.scrollY + 1.25})`;
        } else if (window.scrollY > 1250 && window.scrollY < 2240) {
          exp.current.style.transform = `translateY(0%) scale(${
            (2250 - window.scrollY) / 1000
          })`;
        } else {
          exp.current.style.transform = "translateY(0%) scale(1)";
        }
      }
    });
  });

  /*y = -0.000209 * x + 1.25 func for moving scale from 1.2 to 1 
  with scrolling from 100 to 1200 pixels */

  return (
    <div ref={exp} className={style.wrapper}>
      <div className={style.wrapper__content}>
        I started programming for myself a year ago<br/>
        <span>On background you can see one of my projects</span>
      </div>
      <div className={style.wrapper__bg}>
        <video autoPlay muted loop src="/assets/gosurf.mp4"/>
      </div>
    </div>
  );
};
