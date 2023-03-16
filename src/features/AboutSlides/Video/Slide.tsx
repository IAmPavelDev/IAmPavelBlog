import { useRef, FC, useEffect, memo } from "react";
import style from "./Slide.module.scss";
import { ClimbingBoxLoader } from "react-spinners";

export const Slide: FC<{
  MainText: string;
  SubText?: string;
  videoLink: string;
  active: boolean;
}> = memo(({ MainText, SubText, videoLink, active }) => {
  /*y = -0.000209 * x + 1.25 func for moving scale from 1.2 to 1 
  with scrolling from 100 to 1200 pixels */

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoLastPlayedTime = useRef<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      if (active) {
        videoRef.current.currentTime = videoLastPlayedTime.current;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoLastPlayedTime.current = videoRef.current.currentTime;
        videoRef.current.currentTime = 0;
      }
    }
  });

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
        <video
          muted
          preload="metadata"
          loop
          playsInline
          disablePictureInPicture
          src={videoLink}
          ref={videoRef}
        />
      </div>
    </div>
  );
});
