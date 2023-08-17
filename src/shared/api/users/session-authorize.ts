let isSessionAuth: boolean = false;

export default async function sessionAuthorize() {
  if (
    !isSessionAuth &&
    (!localStorage.getItem("sessionAuth") ||
      localStorage.getItem("sessionAuth") !== "success")
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
      credentials: "include",
    };

    return await fetch(
      process.env.REACT_APP_SERVER_CONNECTION + "/user/sessionEntrance",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem("sessionAuth", res.status);
          isSessionAuth = true;
          return true;
        } else {
          localStorage.setItem("sessionAuth", "error");
          throw new Error("user unauthorized");
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
