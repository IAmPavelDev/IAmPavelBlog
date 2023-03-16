import style from "./Carousel.module.scss";
import { CSSProperties, memo } from "react";

import { ReactComponent as MobX } from "./TecIcons/Mobx-icon.svg";
import { ReactComponent as Mongodb } from "./TecIcons/Mongodb-icon.svg";
import { ReactComponent as MUI } from "./TecIcons/MUI-icon.svg";
import { ReactComponent as Nest } from "./TecIcons/Nest-icon.svg";
import { ReactComponent as ReactIco } from "./TecIcons/React-icon.svg";
import { ReactComponent as Redux } from "./TecIcons/Redux-icon.svg";
import { ReactComponent as Sass } from "./TecIcons/Sass-icon.svg";
import { ReactComponent as Tailwind } from "./TecIcons/Tailwind-icon.svg";
import { ReactComponent as Tux } from "./TecIcons/Tux-icon.svg";
import { ReactComponent as Vite } from "./TecIcons/Vite-icon.svg";
import { ReactComponent as Webpack } from "./TecIcons/Webpack-icon.svg";

export const Carousel = memo(() => {
  return (
    <>
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
            <ReactIco />
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
    </>
  );
});
