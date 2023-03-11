import React, { useState } from "react";

import Auth from "./Auth";
import { Edit } from "./Edit";
import { Create } from "./Create";

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  return isLoggedIn ? (
    <>
      <Create />
      <Edit />
    </>
  ) : (
    <Auth loggedIn={() => setIsLoggedIn(true)} />
  );
};
