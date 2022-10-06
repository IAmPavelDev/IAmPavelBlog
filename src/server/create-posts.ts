import env from "react-dotenv";
import { postObj } from "./../state/types";

export async function createPost(postData: postObj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE"
    );

    var raw = JSON.stringify({
        title: postData.title,
        content: postData.content,
        tags: ["sdsd", "sdcsdcsdc", "sdcsdc"],
    });

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: raw,
        credentials: "include",
    };

    return fetch(env.SERVER_CONNECTION + "/posts", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}
