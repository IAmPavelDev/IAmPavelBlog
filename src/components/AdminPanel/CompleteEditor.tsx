import React, { useRef, useState } from "react";
import JoditReact from "jodit-react-ts";
import "jodit/build/jodit.min.css";

const CompleteEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div>
      <JoditReact onChange={(newContent) => {}} />
    </div>
  );
};

export default CompleteEditor;
