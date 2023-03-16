import { Reducer, useReducer, useRef, ChangeEvent, RefObject } from "react";
import style from "./Editor.module.scss";
import { EditorState } from "draft-js";
import { Editor as ContentEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type inputsType = {
  className: string;
  ref: RefObject<HTMLTextAreaElement>;
  name: string;
  value: string;
};

type stateT = {
  title: string;
  preview: string;
  content: EditorState;
};

type actionT = {
  type: "title" | "preview" | "content" | string;
  payload: string;
};

const initial: stateT = {
  title: "",
  preview: "",
  content: EditorState.createEmpty(),
};

function reducer(state: stateT, action: actionT): stateT {
  switch (action.type) {
    case "preview":
    case "title": {
      return { ...state, [action.type]: action.payload };
    }
    default:
      return state;
  }
}

export default function Editor() {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);

  const [state, dispatch] = useReducer<Reducer<stateT, actionT>>(
    reducer,
    initial
  );

  const inputsData: inputsType[] = [
    {
      className: style.wrapper__title,
      ref: titleRef,
      name: "title",
      value: state.title,
    },
    {
      className: style.wrapper__preview,
      ref: previewRef,
      name: "preview",
      value: state.preview,
    },
  ];

  return (
    <div className={style.wrapper}>
      {inputsData.map((data: inputsType) => (
        <textarea
          ref={data.ref}
          className={data.className}
          value={data.value}
          name={data.name}
          key={data.name}
          placeholder={data.name}
          rows={4}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch({ type: e.target.name, payload: e.target.value });
          }}
        />
      ))}
      <ContentEditor
        editorState={state.content}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(e: EditorState) => {
          console.log(e);
          dispatch({ type: "content", payload: "" });
        }}
      />
    </div>
  );
}

//TODO https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
