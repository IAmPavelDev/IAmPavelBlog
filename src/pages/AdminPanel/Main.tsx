import React, { useState } from "react";

import Auth from "./Auth";
import { Edit } from "./Edit";
import { Create } from "./Create";
import Editor from "./Editor";

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  return isLoggedIn ? (
    <>
      {/* <Create />
      <Edit /> */}
      <Editor />
    </>
  ) : (
    <Auth loggedIn={() => setIsLoggedIn(true)} />
  );
};
