import {
    action,
    computed,
    makeObservable,
    observable,
    toJS,
    runInAction,
} from "mobx";
import { createPost } from "../server/create-posts";
import { fetchPosts } from "../server/fetchPosts";
import { postObj } from "./types";

class PostsStore {
    posts: postObj[] = [];
    constructor() {
        makeObservable(this, {
            posts: observable,
            addPosts: action,
            loadPosts: action,
            getPosts: computed,
        });
    }
    async addPosts(post: postObj) {
        const create = async () => await createPost(post);
        create().then(async () => await this.loadPosts());
    }
    async loadPosts() {
        const posts = await fetchPosts();
        runInAction(() => {
            this.posts = posts;
        });
    }
    public get getPosts() {
        console.log(this.posts)
        return toJS(this.posts);
    }
}

export default new PostsStore();
