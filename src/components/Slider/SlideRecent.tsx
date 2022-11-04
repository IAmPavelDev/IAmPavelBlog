import React, { FC, useRef } from "react";
import style from "./SlideRecent.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../../state/store";
import { IPost, ITag } from "../../types";
import { observer } from "mobx-react-lite";
import { title } from "process";

const Slide: FC<{
  previewImage: string;
  tags: ITag[];
  title: string;
  date?: Date;
  preview: string;
}> = ({ previewImage, tags, title, date, preview }) => {
  return (
    <div className={style.wrapper__slider__slide}>
      <div className={style.slide__image__back}>
        <div className={style.mask} />
        <img src={previewImage} alt="background" />
      </div>
      <div className={style.slide__content}>
        <div className={style.slide__content__tags}>
          {tags.slice(0, 3).map((tag: ITag) => (
            <span key={tag.id}>{tag.tagWord.toUpperCase()}</span>
          ))}
        </div>
        <div className={style.slide__content__title}>{title}</div>
        <div className={style.slide__content__preview}>
          <div className={style.preview__date}>
            {date?.toString().slice(0, 10).split("-").reverse().join(".") ??
              "once"}
          </div>
          <span />
          <div className={style.preview__content}>{preview}</div>
        </div>
      </div>
    </div>
  );
};

const SlideRecent: FC<{}> = observer(() => {
  const sliderOptions = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
  };
  console.log(store.getPosts);

  return (
    <div className={style.wrapper}>
      <div>
        <Slider className={style.wrapper__slider} {...sliderOptions}>
          {store.getPosts.map((post: IPost) => (
            <Slide
              previewImage={post.previewImage}
              tags={post.tags || []}
              title={post.title}
              date={post.creationDate}
              preview={post.preview}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default SlideRecent;
