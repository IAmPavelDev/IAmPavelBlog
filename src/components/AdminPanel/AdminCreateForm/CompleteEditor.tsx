import React, { FC } from "react";
import JoditReact from "jodit-react-ts";
import "jodit/build/jodit.min.css";

const CompleteEditor: FC<{ setContentData: (data: string) => void }> = ({
  setContentData,
}) => {
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    dangerouslySetInnerHTML: {
      enable: true,
      maxHistoryLength: 5000,
      timeout: 3600000,
    },
    imageeditor: {
      crop: true,
      resize: true,
    },
    image: {
      editAlign: true,
      editAlt: true,
      editBorderRadius: true,
      editClass: true,
      editId: true,
      editLink: true,
      editMargins: true,
      editSize: true,
      editSrc: true,
      editStyle: true,
      editTitle: true,
      openOnDblClick: true,
      selectImageAfterClose: true,
      showPreview: true,
      useImageEditor: true,
    },
  };

  return (
    <div>
      <JoditReact config={config} onChange={(e: string) => setContentData(e)} />
    </div>
  );
};

export default CompleteEditor;
