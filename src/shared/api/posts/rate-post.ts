import { IPost } from "shared/types";
import sessionAuthorize from "../users/session-authorize";

export async function ratePost(
  postId: string,
  type: "like" | "dislike"
): Promise<IPost> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const raw = JSON.stringify({
    postId,
    type,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
    credentials: "include",
  };

  return fetch(
    process.env.REACT_APP_SERVER_CONNECTION + "/posts/rate",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
