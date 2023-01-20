import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import store from "../../../state/store";
import { IPost } from "../../../types";
import Head from "../../Head/Head";

import { useSpring } from "@react-spring/web";

const Post = () => {
  const [data, setData] = useState<IPost>({
    title: "",
    preview: "",
    previewImage: "/placeholder-image.jpg",
  });
  const location = useLocation();
  useEffect(() => {
    const postData = store.loadPostById(location.pathname.split("/")[2]);
    postData.then((post) => {
      console.log(post);

      post && setData(post);
    });
  }, [location.pathname]);

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  console.log(fade);

  return (
    <>
      <Head />
      <img src={data.previewImage} alt="" />
    </>
  );
};

export default Post;
