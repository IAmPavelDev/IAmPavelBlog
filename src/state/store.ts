import { makeAutoObservable } from "mobx";
import { mobxObj } from "./types";

class PostsStore {
    posts: mobxObj[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    addPosts(post: mobxObj) {
        this.posts.push(post);
    }
}

export default new PostsStore();
