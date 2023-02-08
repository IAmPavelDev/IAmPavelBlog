import React, { lazy } from "react";
import { Routes, Route } from "react-router";
import { Home } from "./Home";
import { PostPage } from "./PostPage";
const AdminPanel = lazy(() => import("./AdminPanel"));

export const Routing = () => {
  return (
    <Routes>
      {/*<Route path="/about" element={<App />} />*/}
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};
