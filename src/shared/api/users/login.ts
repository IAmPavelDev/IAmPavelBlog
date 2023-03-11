type loginData = {
  login: string;
  password: string;
};

export async function login(loginData?: loginData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const raw = loginData ? JSON.stringify({
    username: loginData.login,
    password: loginData.password,
  }) : null;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };
  return fetch(
    process.env.REACT_APP_SERVER_CONNECTION + "/login",
    requestOptions
  )
    .then((response) => response)
    .catch((error) => console.log("error", error));
}
