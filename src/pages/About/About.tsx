import { Place } from "features/AboutSlides/Place";
import style from "./About.module.scss";

export const About = () => {
  return (
    <div className={style.wrapper}>
      <Place />
    </div>
  );
};
