import { IPost, IUpdatePost } from "shared/types";
import sessionAuthorize from "../users/session-authorize";

export async function updatePost(
  postId: string,
  newData: IUpdatePost
): Promise<IPost> {
  if (await sessionAuthorize()) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );
    const raw = JSON.stringify(newData);

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
      credentials: "include",
    };
    return fetch(
      process.env.REACT_APP_SERVER_CONNECTION + "/posts/" + postId,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}
