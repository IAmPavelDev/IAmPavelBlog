import style from "./Post.module.scss";
import { dateToValidString } from "shared/tools/dateToValidString";
import { store } from "shared/store";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FC, useEffect, useRef, useState } from "react";
import { IPost, IUser } from "shared/types";
import { observer } from "mobx-react-lite";

export const Post: FC<{ id: string }> = observer(({ id }) => {
  const [data, setData] = useState<IPost>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const userId = useRef<string>();

  async function like() {
    setIsLiked(true);
    store.postStore.like(id);
    setData((prev) =>
      prev
        ? {
            ...prev,
            likes:
              prev.likes && userId.current
                ? [...prev.likes, userId.current]
                : prev.likes,
          }
        : prev
    );
  }

  async function dislike() {
    setIsLiked(false);
    store.postStore.dislike(id);
    setData((prev) =>
      prev
        ? {
            ...prev,
            likes:
              prev.likes && userId.current
                ? prev.likes.filter((like: string) => like !== userId.current)
                : prev.likes,
          }
        : prev
    );
  }

  useEffect(() => {
    if (!data && !!id) {
      if (id === "catch-new-post") {
        const createdPost = store.postStore.adminCreatedPost;
        createdPost && setData(createdPost);
      } else {
        store.postStore.getPostById(id).then((data) => setData(data));
      }
      store.userStore.getUserData().then((user: IUser) => {
        setIsLiked(user.likes.indexOf(id) !== -1);
        userId.current = user.userId;
      });
    }
  }, []);
  if (!data) {
    return <>Loading...</>;
  }

  return (
    <motion.div
      className={style.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={style.wrapper__head}>
        <img className={style.head__image} src={data.previewImage} alt="" />
        <div className={style.head__mask}></div>
        <div className={style.head__content}>
          <div className={style.content__title}>{data.title}</div>
          <div className={style.content__preview}>{data.preview}</div>
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
            {!!isLiked ? (
              <AiFillLike
                onClick={dislike}
                className={[style.rate__icon__like, style.rate__icon].join(" ")}
              />
            ) : (
              <AiOutlineLike
                onClick={like}
                className={[style.rate__icon__like, style.rate__icon].join(" ")}
              />
            )}

            <div className={style.rate__current}>
              {data?.likes?.length ?? 0}
            </div>
            {/*<AiOutlineDislike*/}
            {/*  */}
            {/*  className={[style.rate__icon__dislike, style.rate__icon].join(*/}
            {/*    " "*/}
            {/*  )}*/}
            {/*/>*/}
          </div>
          <div className={style.wrapper__ctl__views}>
            <AiOutlineEye />
            {data?.views?.length ?? 0}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
