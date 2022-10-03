import React, { useEffect, useState } from "react";
import { getPosts } from "../../server/get-posts";
import store from "../../state/store";
import { postObj } from "../../state/types";

export default function AdminEditPanel() {
    const [posts, setPosts] = useState<Array<postObj | void>>([])
    useEffect(() => {
        (async () => {
            store.loadPosts()
        })()
        const posts = [...store.getPosts()]
        setPosts([...posts])
        console.log(posts)
    });

    return <>posts</>;
}
