import { makeAutoObservable } from "mobx";
import { createPost } from "../server/create-posts";
import { getPosts } from "../server/get-posts";
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
    async loadPosts() {
        const posts = await getPosts();
        this.posts.push(...posts);
    }
    getPosts() {
        return this.posts.map((post) => {
            return {
                content: post.content,
                title: post.title,
                tags: post.tags,
                creationDate: post.creationDate,
                postId: post.postId,
            };
        });
    }
}

export default new PostsStore();
