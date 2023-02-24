import React, { useEffect, useState } from "react";

import { store } from "shared/store";

import AdminAuth from "./AdminAuth";
import { AdminEditPanel } from "./AdminEditPanel";
import AdminCreateForm from "./AdminCreateForm/AdminCreateForm";

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  useEffect(() => {
    store.postStore.loadPosts();
  });
  
  return isLoggedIn ? (
    <>
      <AdminCreateForm />
      <AdminEditPanel />
    </>
  ) : (
    <AdminAuth loggedIn={() => setIsLoggedIn(true)} />
  );
};
