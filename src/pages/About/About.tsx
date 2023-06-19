import { useEffect, useRef, useState } from "react";
import style from "./About.module.scss";
import { VideoSlide, Carousel } from "features/AboutSlides";
import { motion } from "framer-motion";

export const About = () => {
  const place = useRef<HTMLDivElement>(null);
  const xp = useRef<HTMLDivElement>(null);
  const tec = useRef<HTMLDivElement>(null);
  const [activeSlides, setActiveSlides] = useState<boolean[]>([true, false]);
  useEffect(() => {
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight * 1.2);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    window.addEventListener("scroll", () => {
      if (xp.current && place.current && tec.current) {
        const Y = window.scrollY;
        switch (true) {
          case Y < viewportHeight * 1.2: {
            if (Y < viewportHeight)
              place.current.style.transform =
                "scale(" +
                (viewportHeight - window.scrollY) / viewportHeight +
                ")";
            xp.current.style.transform = `translateY(${
              (viewportHeight * 1.2 - window.scrollY) / (viewportHeight / 100)
            }%) scale(${-0.000209 * window.scrollY + 1.25})`;
            tec.current.style.transform = "translateY(110%) scale(1.2)";

            setActiveSlides((prev: boolean[]) => {
              if (Y < viewportHeight / 3 && (!prev[0] || prev[1])) {
                return [true, false];
              } else if (
                Y >= viewportHeight / 3 &&
                Y <= viewportHeight * 0.75 &&
                (!prev[0] || !prev[1])
              ) {
                return [true, true];
              } else if (Y > viewportHeight * 0.75 && (prev[0] || !prev[1])) {
                return [false, true];
              }
              return prev;
            });

            break;
          }
          case Y >= viewportHeight * 1.2 && Y <= viewportHeight * 1.2 + 50: {
            tec.current.style.transform = "translateY(110%) scale(1.2)";
            xp.current.style.transform = "translateY(0%) scale(1)";
            break;
          }
          case Y > viewportHeight * 1.2 + 50 && Y < viewportHeight * 2.5: {
            xp.current.style.transform = `translateY(0%) scale(${
              (viewportHeight * 2.5 - window.scrollY) /
              (viewportHeight * 1.2 + 50)
            })`;
            tec.current.style.transform = `translateY(${
              (viewportHeight * 2.5 - window.scrollY) / (viewportHeight / 100)
            }%) scale(${-0.0002 * window.scrollY + 1.5})`;
            break;
          }
          case Y > viewportHeight * 2.5: {
            xp.current.style.transform = "translateY(0%) scale(0.094)";
            tec.current.style.transform = `translateY(0%) scale(1)`;
            break;
          }
        }
      }
    });
  }, [window]);

  return (
    <motion.div
      className={style.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={style.wrapper__slides}>
        <div ref={place} className={style.slides__place}>
          <VideoSlide
            MainText="Hi, I'm Paul Tkachenko, frontend developer from Odesa, Ukraine."
            src="/assets/Ukraine.mp4"
            placeholder="/assets/ukraine_placeholder.jpg"
            active={activeSlides[0]}
          />
        </div>
        <div ref={xp} className={style.slides__xp}>
          <VideoSlide
            MainText="I started programming for myself a year ago"
            SubText="On background you can see one of my projects"
            src="/assets/gosurf.mp4"
            placeholder="/assets/gosurf_placeholder.png"
            active={activeSlides[1]}
          />
        </div>
        <div ref={tec} className={style.slides__tecs}>
          <Carousel />
        </div>
      </div>
    </motion.div>
  );
};
