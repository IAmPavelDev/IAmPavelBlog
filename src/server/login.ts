import env from "react-dotenv";

export async function login() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        username: "pablo",
        password: "12345678",
    });

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(env.SERVER_CONNECTION + "/login", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}
