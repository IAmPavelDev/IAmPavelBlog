import { IPost } from "shared/types";
import sessionAuthorize from "../users/session-authorize";

export default async function searchPosts(
  data: string,
  type: string
): Promise<IPost[]> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const posts: IPost[] = await fetch(
    process.env.REACT_APP_SERVER_CONNECTION + `/posts?s=${data}&t=${type}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return posts;
}
