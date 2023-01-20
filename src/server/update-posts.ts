import { IPost, IUpdatePost } from "../types";

export async function updatePost(
  postId: string,
  newData: IUpdatePost
): Promise<IPost> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
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
}
