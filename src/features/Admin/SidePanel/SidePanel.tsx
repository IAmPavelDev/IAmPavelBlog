import { Box, Button } from "@mui/material";
import styles from "./SidePanel.module.scss";
import { FC } from "react";

import { spaceT } from "features/Admin/AdminT";
export const SidePanel: FC<{ setSpace: (mode: spaceT) => void }> = ({
  setSpace,
}) => {
  return (
    <Box className={styles.wrapper}>
      <Button
        variant="contained"
        type="submit"
        onClick={() => setSpace("result")}
      >
        Result
      </Button>
      <Button
        variant="contained"
        type="submit"
        onClick={() => setSpace("create")}
      >
        Create
      </Button>
      <Button
        variant="contained"
        type="submit"
        onClick={() => setSpace("edit")}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        type="submit"
        onClick={() => setSpace("upload")}
      >
        upload
      </Button>
    </Box>
  );
};
