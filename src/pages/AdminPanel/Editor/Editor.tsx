import {
  ChangeEvent,
  Reducer,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import style from "./Editor.module.scss";
import postImage from "shared/api/images/postImage";

type inputsType = {
  className: string;
  ref: RefObject<HTMLTextAreaElement>;
  name: string;
  value: string;
};

type stateT = {
  title: string;
  preview: string;
  content: HTMLElement[];
};

type actionT = {
  type: "title" | "preview" | "content" | "contentKeyHandler";
  payload: string;
};

type textInputT = "H1" | "H2" | "H3";
type addElementT = textInputT | "Image";

const initial: stateT = {
  title: "",
  preview: "",
  content: [],
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

export default function EditorSetUp() {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const headSelector = useRef<HTMLSelectElement>(null);
  const addImageBtn = useRef<HTMLButtonElement>(null);
  const contentContainer = useRef<HTMLDivElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer<Reducer<stateT, actionT>>(
    reducer,
    initial
  );

  const uploadImageToServer = useCallback(async (): Promise<string> => {
    if (imageInput.current && !imageInput.current.files?.length) {
      imageInput.current.style.display = "block";
    }
    if (imageInput.current && imageInput.current.files?.length) {
      return await postImage(imageInput.current.files[0]);
    }
    return "";
  }, [Window]);

  const AddElement = useCallback(
    async (type: addElementT, contentNode: HTMLDivElement) => {
      let element: HTMLElement | HTMLImageElement | null = null;

      if (["H1", "H2", "H3"].includes(type)) {
        element = document.createElement(type);
        element.innerText = prompt(`Enter text for new ${type} element`) ?? "";
      }
      if (type === "Image") {
        element = document.createElement("img");
        (element as HTMLImageElement).src = await uploadImageToServer();
      }

      if (!element) {
        console.log("error, unknown parameter");
        return;
      }
      contentNode.appendChild(element);
    },
    [Window]
  );

  useEffect(() => {
    headSelector.current &&
      headSelector.current.addEventListener("change", (e: Event) => {
        const { value: SelectedValue } = e.target as {
          value: textInputT;
        } & HTMLSelectElement;
        if (contentContainer.current) {
          AddElement(SelectedValue, contentContainer.current);
        }
      });
  });

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
            dispatch({
              type: e.target.name as "title" | "preview",
              payload: e.target.value,
            });
          }}
        />
      ))}
      <div className={style.wrapper__controls}>
        <ImageUploader />
        <select
          name={"head"}
          ref={headSelector}
          className={style.controls__head}
        >
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
        </select>
        <button ref={addImageBtn} className={style.controls__image}>
          Image
        </button>
        <input
          ref={imageInput}
          type={"file"}
          className={style["controls__image--input"]}
        />
      </div>
      <div
        ref={contentContainer}
        className={style.wrapper__content}
        contentEditable="true"
      ></div>
    </div>
  );
}

function ImageUploader() {
  const [links, setLinks] = useState<string[]>([]);
  const uploadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const imgInput = uploadInput.current;
    if (imgInput) {
      imgInput.addEventListener("change", async () => {
        if (!imgInput.files) {
          console.error("files not found");
          return;
        }
        const file: File = imgInput.files[0];
        const link = await postImage(file);
        if (!link) {
          console.error("can't get link from server");
          return;
        }
        setLinks((prev) => [link, ...prev]);
      });
    }
  }, [uploadInput]);
  return (
    <div className={style.uploader}>
      <input ref={uploadInput} type="file" />
      {links.map((link, idx) => (
        <div key={idx} className={style.uploader__image}>
          <img alt="" src={link} />
          <button onClick={() => navigator.clipboard.writeText(link)}>
            Click to copy link
          </button>
        </div>
      ))}
    </div>
  );
}
