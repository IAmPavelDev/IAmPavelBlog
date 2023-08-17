import sessionAuthorize from "../users/session-authorize";
import { IPost } from "../../types";
async function fetchPostData(
  postId: string,
  isOnlyContent: boolean
): Promise<IPost | { postId: string; content: string }> {
  if (await sessionAuthorize()) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await fetch(
      process.env.REACT_APP_SERVER_CONNECTION +
        "/posts/" +
        postId +
        (isOnlyContent ? "?mode=onlyContent" : ""),
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}

export const getPostDataById = (id: string): Promise<IPost> =>
  fetchPostData(id, false) as Promise<IPost>;

export const getPostContentById = async (id: string): Promise<string> => {
  const data = (await fetchPostData(id, true)) as {
    postId: string;
    content: string;
  };

  if (data.postId !== id) {
    throw new Error(
      "error while fetching post content, postId: " +
        id +
        ", received post content id: " +
        data.postId
    );
  }

  return data.content;
};
