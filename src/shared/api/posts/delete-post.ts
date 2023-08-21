import sessionAuthorize from "../users/session-authorize";

export async function deletePost(postId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };
  return fetch(
    process.env.REACT_APP_SERVER_CONNECTION + "/posts/" + postId,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data.postId)
    .catch((error) => console.log("error", error));
}
