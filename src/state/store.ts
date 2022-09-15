import { makeAutoObservable } from "mobx";
import { createPost } from "../server/create-posts";
import { postObj } from "./types";

class PostsStore {
    posts: postObj[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    async addPosts(post: postObj) {
        await createPost(post);
        this.posts.push(post);
    }
}

export default new PostsStore();
