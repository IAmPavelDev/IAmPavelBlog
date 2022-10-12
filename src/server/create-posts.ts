import env from "react-dotenv";
import { IPost } from "./../state/types";

export async function createPost(postData: IPost) {
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
        preview: postData.preview,
        tags: postData.tags,
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
