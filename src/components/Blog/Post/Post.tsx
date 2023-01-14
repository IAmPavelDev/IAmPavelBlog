import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import store from "../../../state/store";
import { IPost } from "../../../types";
import Head from "../../Head/Head";

const Post = () => {
  const [data, setData] = useState<IPost>({
    title: "",
    preview: "",
    previewImage: "/placeholder-image.jpg",
  });
  console.log(data);

  const location = useLocation();
  useEffect(() => {
    const postData = store.loadPostById(location.pathname.split("/")[2]);
    postData.then((post) => {
      console.log(post);

      post && setData(post);
    });
  }, [location.pathname]);
  return (
    <>
      <Head />
      <img src={data.previewImage} alt="" />
    </>
  );
};

export default Post;
