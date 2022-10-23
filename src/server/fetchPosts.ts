import env from "react-dotenv";
import { IFetchData } from "../types";

export async function fetchPosts(
  page: number,
  search: string = "",
  existedPostsIds: string[] = []
): Promise<IFetchData> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  if (existedPostsIds) {
    const existed = existedPostsIds.reduce((str, id) => str + `&e=${id}`, "");

    return await fetch(
      env.SERVER_CONNECTION + `/posts?p=${page}&s=${search + existed}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  }
  return await fetch(
    env.SERVER_CONNECTION + `/posts?p=${page}&s=${search}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
