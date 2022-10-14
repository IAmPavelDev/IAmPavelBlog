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
import { getContent } from "../server/get-content";
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
    async loadContent(postId: string): Promise<string> {
        const content = this.posts.find(
            (post: IPost) => post.postId === postId
        )?.content;
        if (content) {
            return content;
        }
        return await getContent(postId).then(
            (response: { postId: string; content: string }) => {
                if (response.postId !== postId) {
                    throw new Error(
                        "PostId and response postId not the same, store.ts, str: 40"
                    );
                }
                return response.content;
            }
        );
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
        console.log(updatable);
        updatePost(postId, newData).then((server: IPost) => {
            runInAction(() => {
                this.posts[this.posts.indexOf(updatable)] = server;
            });
        });
    }
    async deletePost(postId: string) {
        const { deletedPostId } = await deletePost(postId);
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
