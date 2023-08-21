export default async function sessionAuthorize() {
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
    process.env.REACT_APP_SERVER_CONNECTION + "/user/sessionEntrance",
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.status === "success") {
        return res.user;
      } else {
        throw new Error("user unauthorized");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}
