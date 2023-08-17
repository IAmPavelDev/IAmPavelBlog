import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./PostPage.module.scss";

import { Post } from "features/Post";

export const PostPage = () => {
  const [id, setId] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
    setId(location.pathname.split("/")[2]);
  }, []);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.wrapper}>
      <Post id={id} />
    </div>
  );
};
