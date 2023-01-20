export default function sessionAuthorize() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    process.env.REACT_APP_SERVER_CONNECTION + `/sessionEntrance`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
