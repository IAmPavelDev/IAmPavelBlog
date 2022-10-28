export async function deletePost(postId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  var requestOptions: RequestInit = {
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
    .catch((error) => console.log("error", error));
}
