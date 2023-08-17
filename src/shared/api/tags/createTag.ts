import { ITag } from "shared/types";
import sessionAuthorize from "shared/api/users/session-authorize";

export async function createTag(content: string) {
  if (await sessionAuthorize()) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );

    const raw = JSON.stringify({
      content,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
      credentials: "include",
    };

    return fetch(
      process.env.REACT_APP_SERVER_CONNECTION + "/tags",
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}
