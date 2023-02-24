import sessionAuthorize from "../users/session-authorize";

export async function getPostById(postId: string, isOnlyContent: boolean) {
  if (await sessionAuthorize()) {
    var myHeaders = new Headers();
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
    };

    return await fetch(
      process.env.REACT_APP_SERVER_CONNECTION +
        "/posts/" +
        postId +
        (isOnlyContent ? "?mode=onlyContent" : ""),
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } else {
    throw new Error("user unauthorized");
  }
}
