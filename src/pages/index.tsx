import React, { lazy } from "react";
import { Routes, Route } from "react-router";
import { Head } from "../features/Head";

const Home = lazy(() =>
  import("./Home").then((module) => ({ default: module.Home }))
);
const AdminPanel = lazy(() =>
  import("./AdminPanel").then((module) => ({ default: module.AdminPanel }))
);
const  PostPage = lazy(() =>
import("./PostPage").then((module) => ({ default: module.PostPage }))
);
const About = lazy(() =>
import("./About").then((module) => ({ default: module.About }))
);

export const Routing = () => {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
};
