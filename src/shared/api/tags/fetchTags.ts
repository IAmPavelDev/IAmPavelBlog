import { ITag } from "shared/types";
import sessionAuthorize from "shared/api/users/session-authorize";

export async function fetchTags(query: string): Promise<ITag[]> {
  if (await sessionAuthorize()) {
    const myHeaders = new Headers();
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
      credentials: "include",
    };
    return await fetch(
      process.env.REACT_APP_SERVER_CONNECTION + `/tags?q=${query}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}
