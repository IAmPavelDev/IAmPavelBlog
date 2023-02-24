import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./PostPage.module.scss";

import { store } from "shared/store";
import { IPost } from "shared/types";

import * as DOMPurify from "dompurify";
// import { useSpring } from "@react-spring/web";
import { dateToValidString } from "../../shared/tools/dateToValidString";
import { AiOutlineDislike, AiOutlineEye, AiOutlineLike } from "react-icons/ai";

export const PostPage = () => {
  const [data, setData] = useState<IPost | null>(null);
  const location = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
    const postData = store.postStore.loadPostById(
      location.pathname.split("/")[2]
    );
    postData.then((post) => {
      post && setData(post);
    });
  }, [location.pathname]);

  // const fade = useSpring({
  //   from: {
  //     opacity: 0,
  //   },
  //   to: {
  //     opacity: 1,
  //   },
  // });

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__head}>
        <img className={style.head__image} src={data.previewImage} alt="" />
        <div className={style.head__mask}></div>
        <div className={style.head__content}>
          <div className={style.content__title}>{data.title}</div>
          <div className={style.content__preview}>{data.preview}</div>
          <div className={style.content__author}>by {"Author"}</div> {/*TODO*/}
        </div>
      </div>
      <div className={style.wrapper__content}>
        <div className={style.content__data}>
          <div className={style.content__date}>
            {data.creationDate ? dateToValidString(data.creationDate) : "once"}
            <span />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.content ?? "<p>Can`t load content</p>",
            }}
          />
        </div>
      </div>
      <div className={style.wrapper__ctl}>
        <div className={style.wrapper__ctl__container}>
          <div className={style.wrapper__ctl__rate}>
            <AiOutlineLike
              className={[style.rate__icon__like, style.rate__icon].join(" ")}
            />
            <div className={style.rate__current}>+15</div>
            <AiOutlineDislike
              className={[style.rate__icon__dislike, style.rate__icon].join(
                " "
              )}
            />
          </div>
          <div className={style.wrapper__ctl__views}><AiOutlineEye />200</div>
        </div>
      </div>
    </div>
  );
};
