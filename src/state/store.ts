import {
    action,
    computed,
    makeObservable,
    observable,
    toJS,
    runInAction,
} from "mobx";
import { createPost } from "../server/create-posts";
import { deletePost } from "../server/delete-post";
import { fetchPosts } from "../server/fetchPosts";
import { updatePost } from "../server/update-posts";
import { IPost, IUpdatePost } from "./types";

class PostsStore {
    posts: IPost[] = [];
    constructor() {
        makeObservable(this, {
            posts: observable,
            addPosts: action,
            loadPosts: action,
            updatePosts: action,
            getPosts: computed,
        });
    }
    async addPosts(post: IPost) {
        createPost(post)
            .then((data) => this.posts.push(data))
            .catch(() => console.error("Failed to fetch, str: 26, store.ts"));
    }
    async loadPosts() {
        const posts = await fetchPosts();
        runInAction(() => {
            this.posts = posts;
        });
    }
    async updatePosts(postId: string, newData: IUpdatePost) {
        const updatable: IPost | undefined = this.posts.find(
            (post: IPost) => post.postId === postId
        );
        if (!updatable) {
            console.error("Post not found");
            return;
        }

        updatePost(postId, newData).then((server: IPost) => {
            runInAction(() => {
                this.posts[this.posts.indexOf(updatable)] = server;
            });
        });
    }
    async deletePost(postId: string) {
        const {deletedPostId} = await deletePost(postId);
        runInAction(() => {
            this.posts = this.posts.filter(
                (post: IPost) => post.postId !== deletedPostId
            );
        });
    }
    public get getPosts() {
        return toJS(this.posts);
    }
}

export default new PostsStore();
