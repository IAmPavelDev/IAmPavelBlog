export default async function sessionAuthorize() {
  if (
    !localStorage.getItem("sessionAuth") ||
    localStorage.getItem("sessionAuth") !== "success"
  ) {
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
      credentials: "include"
    };

    return await fetch(
      process.env.REACT_APP_SERVER_CONNECTION + `/sessionEntrance`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        if (res.status === "success") {
          localStorage.setItem("sessionAuth", res.status);
          return true;
        } else {
          localStorage.setItem("sessionAuth", "error");
          return false;
        }
      })
      .catch((error) => {
        console.log("error", error);
        localStorage.setItem("sessionAuth", "error");
        return false;
      });
  }
  return true;
}
