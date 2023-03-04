import { Slide } from "features/AboutSlide";
import { CSSProperties, useEffect, useRef } from "react";
import style from "./About.module.scss";

import { ReactComponent as MobX } from "./TecIcons/Mobx-icon.svg";
import { ReactComponent as Mongodb } from "./TecIcons/Mongodb-icon.svg";
import { ReactComponent as MUI } from "./TecIcons/MUI-icon.svg";
import { ReactComponent as Nest } from "./TecIcons/Nest-icon.svg";
import { ReactComponent as React } from "./TecIcons/React-icon.svg";
import { ReactComponent as Redux } from "./TecIcons/Redux-icon.svg";
import { ReactComponent as Sass } from "./TecIcons/Sass-icon.svg";
import { ReactComponent as Tailwind } from "./TecIcons/Tailwind-icon.svg";
import { ReactComponent as Tux } from "./TecIcons/Tux-icon.svg";
import { ReactComponent as Vite } from "./TecIcons/Vite-icon.svg";
import { ReactComponent as Webpack } from "./TecIcons/Webpack-icon.svg";

export const About = () => {
  const place = useRef<HTMLDivElement>(null);
  const xp = useRef<HTMLDivElement>(null);
  const tec = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (xp.current && place.current && tec.current) {
        const Y = window.scrollY;
        switch (true) {
          case Y < 1200: {
            if (Y < 990)
              place.current.style.transform =
                "scale(" + (1000 - window.scrollY) / 1000 + ")";
            xp.current.style.transform = `translateY(${
              (1200 - window.scrollY) / 10
            }%) scale(${-0.000209 * window.scrollY + 1.25})`;
            break;
          }
          case Y >= 1200 && Y <= 1250: {
            xp.current.style.transform = "translateY(0%) scale(1)";
            break;
          }
          case Y > 1250 && Y < 2500: {
            xp.current.style.transform = `translateY(0%) scale(${
              (2500 - window.scrollY) / 1250
            })`;
            tec.current.style.transform = `translateY(${
              (2500 - window.scrollY) / 10
            }%) scale(${-0.0002 * window.scrollY + 1.5})`;
            break;
          }
          case Y > 2500: {
            xp.current.style.transform = "translateY(0%) scale(0.094)";
            tec.current.style.transform = `translateY(0%) scale(1)`;
            break;
          }
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
        <div ref={tec} className={style.slides__tecs}>
          <div className={style.sliderContainer}>
            <div className={style.tecs__props}>
              <div
                style={{ "--idx": 1 } as CSSProperties}
                className={style.props__prop}
              >
                <MobX />
              </div>
              <div
                style={{ "--idx": 2 } as CSSProperties}
                className={style.props__prop}
              >
                <React />
              </div>
              <div
                style={{ "--idx": 3 } as CSSProperties}
                className={style.props__prop}
              >
                <Redux />
              </div>
              <div
                style={{ "--idx": 4 } as CSSProperties}
                className={style.props__prop}
              >
                <Webpack />
              </div>
              <div
                style={{ "--idx": 5 } as CSSProperties}
                className={style.props__prop}
              >
                <Tux />
              </div>
              <div
                style={{ "--idx": 6 } as CSSProperties}
                className={style.props__prop}
              >
                <Vite />
              </div>
              <div
                style={{ "--idx": 7 } as CSSProperties}
                className={style.props__prop}
              >
                <MUI />
              </div>
              <div
                style={{ "--idx": 8 } as CSSProperties}
                className={style.props__prop}
              >
                <Nest />
              </div>
              <div
                style={{ "--idx": 9 } as CSSProperties}
                className={style.props__prop}
              >
                <Sass />
              </div>
              <div
                style={{ "--idx": 10 } as CSSProperties}
                className={style.props__prop}
              >
                <Tailwind />
              </div>
              <div
                style={{ "--idx": 11 } as CSSProperties}
                className={style.props__prop}
              >
                <Mongodb />
              </div>
            </div>
          </div>
          <div className={style.info}>
            Here you can see every technology I have experience in.
          </div>
        </div>
      </div>
    </div>
  );
};
