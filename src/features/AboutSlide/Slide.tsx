import { useRef, FC } from "react";
import style from "./Slide.module.scss";

export const Slide: FC<{
  MainText: string;
  SubText?: string;
  videoLink: string;
}> = ({ MainText, SubText, videoLink }) => {

  /*y = -0.000209 * x + 1.25 func for moving scale from 1.2 to 1 
  with scrolling from 100 to 1200 pixels */

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__content}>
        {MainText}
        {SubText ? (
          <>
            <br />
            <span>{SubText}</span>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={style.wrapper__bg}>
        <video autoPlay muted loop src={videoLink} />
      </div>
    </div>
  );
};
