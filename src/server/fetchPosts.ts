import { IFetchData } from "../types";

export async function fetchPosts(
  page: number,
  search: string = "",
  type: string = ""
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
  return await fetch(
    process.env.REACT_APP_SERVER_CONNECTION +
      `/posts?p=${page}&s=${search}&t=${type}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
