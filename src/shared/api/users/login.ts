export type loginData = {
  username: string;
  password: string;
};

export async function login({ username, password }: loginData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  const raw = JSON.stringify({
    username,
    password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  return fetch(
    process.env.REACT_APP_SERVER_CONNECTION + "/user/login",
    requestOptions
  )
    .then((data) => data.json())
    .catch((error) => console.log("error", error));
}
