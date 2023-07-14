import React, { useState } from "react";

import Auth from "features/Admin/Auth";
import { SidePanel } from "features/Admin/SidePanel";
import styles from "./Admin.module.scss";

import { spaceT } from "features/Admin/AdminT";
import { Create } from "features/Admin/Create";
import { Upload } from "features/Admin/Upload";
import { Post } from "features/Post";
import { Edit } from "../../features/Admin/Edit";

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [space, setSpace] = useState<spaceT>("create");

  return isLoggedIn ? (
    <div className={styles.wrapper}>
      <SidePanel setSpace={setSpace} />
      <div className={styles.wrapper__space}>
        {(() => {
          if (space === "create") {
            return <Create />;
          }
          if (space === "edit") {
            return <Edit />;
          }
          if (space === "upload") {
            return <Upload />;
          }
          if (space === "result") {
            return <Post id={"catch-new-post"} />;
          }
        })()}
      </div>
    </div>
  ) : (
    <Auth loggedIn={() => setIsLoggedIn(true)} />
  );
};
