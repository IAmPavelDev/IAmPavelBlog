import { Slide } from "features/AboutSlide";
import { useEffect, useRef } from "react";
import style from "./About.module.scss";

export const About = () => {
  const place = useRef<HTMLDivElement>(null);
  const xp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (xp.current && place.current) {
        if (window.scrollY < 990) {
          place.current.style.transform =
            "scale(" + (1000 - window.scrollY) / 1000 + ")";
        }
        if (window.scrollY < 1200) {
          xp.current.style.transform = `translateY(${
            (1200 - window.scrollY) / 10
          }%) scale(${-0.000209 * window.scrollY + 1.25})`;
        } else if (window.scrollY > 1250 && window.scrollY < 2240) {
          xp.current.style.transform = `translateY(0%) scale(${
            (2250 - window.scrollY) / 1000
          })`;
        } else {
          xp.current.style.transform = "translateY(0%) scale(1)";
        }
      }
    });
  });

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__slides}>
        <div ref={place} className={style.slides__place}>
          <Slide
            MainText="Hi, I'm Paul Tkachenko, frontend developer from Odesa, Ukraine."
            videoLink="/assets/Ukraine.mp4"
          />
        </div>
        <div ref={xp} className={style.slides__xp}>
          <Slide
            MainText="I started programming for myself a year ago"
            SubText="On background you can see one of my projects"
            videoLink="/assets/gosurf.mp4"
          />
        </div>
        <div className={style.slides__tecs}></div>
      </div>
    </div>
  );
};
