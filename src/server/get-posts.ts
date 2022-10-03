import env from "react-dotenv";

export async function getPosts() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin','*');
    myHeaders.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

    var requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const posts = await fetch(env.SERVER_CONNECTION + "/posts", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));

    return posts;
}
