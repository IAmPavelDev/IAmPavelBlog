import env from "react-dotenv";
import { IPost } from "../types";

export default async function searchPosts(data: string, type: string): Promise<IPost[]> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin','*');
    myHeaders.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

    var requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const posts:IPost[] = await fetch(env.SERVER_CONNECTION + `/posts?s=${data}&t=${type}`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));

    return posts;
}