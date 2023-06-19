import React, { useState } from "react";

import Auth from "./Auth";
import { Edit } from "./Edit";
import { Create } from "./Create";
import EditorSetUp from "./Editor";

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  return isLoggedIn ? (
    <>
      {/* <Create />
      <Edit /> */}
      <EditorSetUp />
    </>
  ) : (
    <Auth loggedIn={() => setIsLoggedIn(true)} />
  );
};
