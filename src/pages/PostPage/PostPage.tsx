import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { store } from "shared/store";
import { IPost } from "shared/types";
import { Head } from "features/Head";

import { useSpring } from "@react-spring/web";

export const PostPage = () => {
  const [data, setData] = useState<IPost>({
    title: "",
    preview: "",
    previewImage: "/placeholder-image.jpg",
  });
  const location = useLocation();
  useEffect(() => {
    const postData = store.postStore.loadPostById(
      location.pathname.split("/")[2]
    );
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

  return (
    <>
      <Head />
      <img src={data.previewImage} alt="" />
    </>
  );
};
