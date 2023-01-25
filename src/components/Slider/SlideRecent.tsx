import React, { FC, useEffect, useRef } from "react";
import style from "./SlideRecent.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../../state/store";
import { IPost, ITag } from "../../types";
import { observer } from "mobx-react-lite";
import TagCard from "../../Elements/TagCard";
import DateCard from "../../Elements/DateCard";
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
            <div key={tag.id}>
              <TagCard type="light" text={tag.tagWord} />
            </div>
          ))}
        </div>
        <div className={style.slide__content__title}>{title}</div>
        <div className={style.slide__content__preview}>
          <div className={style.preview__date}>
            <DateCard fontColorType="light" dateToDisplay={date} />
          </div>
          <span />
          <div className={style.preview__content}>{preview}</div>
        </div>
      </div>
    </div>
  );
};

const SlideRecent = observer(() => {
  const sliderOptions = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className={style.wrapper}>
      <div>
        <Slider className={style.wrapper__slider} {...sliderOptions}>
          {store.getPosts.slice(0, 5).map((post: IPost) => (
            <Slide
              previewImage={post.previewImage}
              tags={post.tags || []}
              title={post.title}
              date={post.creationDate}
              preview={post.preview}
              key={(post.previewImage + post.title).slice(
                parseInt(
                  ((post.previewImage + post.title).length / 3).toFixed(0)
                ),
                (Math.random() + 0.5) * 10
              )}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default SlideRecent;
