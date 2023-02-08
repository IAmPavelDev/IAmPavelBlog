function clearIntervalCreator(
  id: string | number | NodeJS.Timeout | undefined
): () => void {
  return () => clearInterval(id);
}

const runnedRefreshers: Array<() => void> = [];

export function setTokenRefresh() {
  runnedRefreshers.forEach((stop: () => void) => stop());
  const cleaner = setInterval(refreshToken, 3500000);
  runnedRefreshers.push(clearIntervalCreator(cleaner));
}

function refreshToken() {
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
  fetch(
    process.env.REACT_APP_SERVER_CONNECTION + "/tockenRefresh",
    requestOptions
  )
    .then((response) => response)
    .catch((error) => console.log("error", error));
}
