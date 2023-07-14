import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./PostPage.module.scss";

import { Post } from "features/Post";
import { motion } from "framer-motion";

export const PostPage = () => {
  const [id, setId] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
    setId(location.pathname.split("/")[2]);
  }, [location.pathname]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className={style.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Post id={id} />
    </motion.div>
  );
};
