import { IFetchData, ITag } from "shared/types";
import sessionAuthorize from "../users/session-authorize";

export async function fetchPosts(
  page: number,
  search: string = "",
  tagIds: string[]
): Promise<IFetchData> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  return await fetch(
    process.env.REACT_APP_SERVER_CONNECTION +
      `/posts?p=${page}&s=${search}&t=${tagIds}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
