import React, { ComponentType, lazy, LazyExoticComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";

import { Head } from "features/Head";

const pages: {
  element: LazyExoticComponent<ComponentType<any>>;
  path: string;
}[] = [
  {
    element: lazy(() =>
      import("./Home").then((module) => ({ default: module.Home }))
    ),
    path: "/",
  },
  {
    element: lazy(() =>
      import("./About").then((module) => ({ default: module.About }))
    ),
    path: "/about",
  },
  {
    element: lazy(() =>
      import("./Search").then((module) => ({ default: module.SearchPage }))
    ),
    path: "/search",
  },
  {
    element: lazy(() =>
      import("./PostPage").then((module) => ({ default: module.PostPage }))
    ),
    path: "/post/:postId",
  },
  {
    element: lazy(() =>
      import("./AdminPanel").then((module) => ({ default: module.AdminPanel }))
    ),
    path: "/admin",
  },
];

export const Routing = () => {
  const location = useLocation();
  return (
    <>
      <Head />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.6, scale: 0 }}
                >
                  <page.element />
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
    </>
  );
};
