import React, { lazy } from "react";
import { AnimatePresence } from "framer-motion";

import { Routes, Route } from "react-router";
import { Head } from "../features/Head";
import { useLocation } from "react-router-dom";

const Home = lazy(() =>
  import("./Home").then((module) => ({ default: module.Home }))
);
const AdminPanel = lazy(() =>
  import("./AdminPanel").then((module) => ({ default: module.AdminPanel }))
);
const PostPage = lazy(() =>
  import("./PostPage").then((module) => ({ default: module.PostPage }))
);
const About = lazy(() =>
  import("./About").then((module) => ({ default: module.About }))
);

export const Routing = () => {
  const location = useLocation();
  return (
    <>
      <Head />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
