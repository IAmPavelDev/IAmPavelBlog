import env from "react-dotenv";

type loginData = {
    login: string;
    password: string;
};

export async function login(loginData: loginData) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin','*');
    myHeaders.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

    var raw = JSON.stringify({
        username: loginData.login,
        password: loginData.password,
    });

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
    };
    console.log(requestOptions.body);
    return fetch(env.SERVER_CONNECTION + "/login", requestOptions)
        .then((response) => response)
        .catch((error) => console.log("error", error));
}
