import sessionAuthorize from "../users/session-authorize";

export async function deleteTag(tagId: string) {
  if (await sessionAuthorize()) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };
    return fetch(
      process.env.REACT_APP_SERVER_CONNECTION + "/tags/" + tagId,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}
