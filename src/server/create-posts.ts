import env from "react-dotenv";
import { postObj } from "./../state/types";

export async function createPost(postData: postObj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        title: postData.title,
        content: postData.content,
        tags: postData.tags?.map(tag => {return tag.tagWord}),
    });

console.log(JSON.parse(raw));

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    return fetch(env.SERVER_CONNECTION + "/posts", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}
