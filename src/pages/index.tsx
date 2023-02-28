import React, { lazy } from "react";
import { Routes, Route } from "react-router";
import { Home } from "./Home";
import { PostPage } from "./PostPage";
import { Head } from "../features/Head";
const AdminPanel = lazy(() => import("./AdminPanel"));
import { About } from "./About";

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
