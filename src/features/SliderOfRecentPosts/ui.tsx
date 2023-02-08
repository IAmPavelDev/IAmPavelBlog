import React, { FC, useState } from "react";
import style from "./SlideRecent.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { store } from "shared/store";
import { observer } from "mobx-react-lite";

import { IPost } from "shared/types/IPost";

import TagCard from "shared/ui/TagCard";
import DateCard from "shared/ui/DateCard";
import { ITag } from "shared/types/ITag";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Slide: FC<{
  postId?: string;
}> = ({ postId }) => {
  const [postDataState, setPostDataState] = useState<
    IPost | "Error" | "Loading"
  >("Loading");

  postId &&
    store.postStore.getPostById(postId).then((postData?: IPost) => {
      if (!postData || postData.postId != postId) {
        setPostDataState("Error");
        return;
      }
      setPostDataState(postData);
    });

  if (postDataState === "Error") {
    return <>Error</>;
  }
  if (postDataState === "Loading") {
    return <>Loading...</>;
  }

  return (
    <div className={style.wrapper__slider__slide}>
      <div className={style.slide__image__back}>
        <div className={style.mask} />
        <LazyLoadImage
          src={postDataState.previewImage}
          alt="background"
          effect="opacity"
          className={style.img}
          placeholderSrc={"/placeholder-image.jpg"}
        />
      </div>
      <div className={style.slide__content}>
        <div className={style.slide__content__tags}>
          {postDataState.tags?.slice(0, 3).map((tag: ITag) => (
            <div key={tag.id}>
              <TagCard type="light" text={tag.tagWord} />
            </div>
          ))}
        </div>
        <div className={style.slide__content__title}>{postDataState.title}</div>
        <div className={style.slide__content__preview}>
          <div className={style.preview__date}>
            <DateCard
              fontColorType="light"
              dateToDisplay={postDataState.creationDate}
            />
          </div>
          <span />
          <div className={style.preview__content}>{postDataState.preview}</div>
        </div>
      </div>
    </div>
  );
};

export const SliderOfRecentPosts = observer(() => {
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
          {store.postStore.getPostsIdsToDisplay
            .slice(0, 5)
            .map((postId?: string) => (
              <div key={postId}>
                <Slide postId={postId} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
});
