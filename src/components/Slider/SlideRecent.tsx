import React, { FC } from "react";
import style from "./SlideRecent.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideRecent: FC<{}> = () => {
  const sliderOptions = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div className={style.wrapper}>
      <div>
        <Slider {...sliderOptions}>

        </Slider>
      </div>
    </div>
  );
};

export default SlideRecent;
