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
import { IPost, ITag, IUpdatePost } from "./types";

class PostsStore {
    posts: IPost[] = [];
    postsCarrier: IPost[] = [];
    tagsInSearch: ITag[] = [];
    constructor() {
        makeObservable(this, {
            posts: observable,
            tagsInSearch: observable,
            addPosts: action,
            loadPosts: action,
            updatePosts: action,
            searchByTag: action,
            getPosts: computed,
        });
    }
    async addPosts(post: IPost) {
        createPost(post)
            .then((data) => {
                this.postsCarrier.push(data);
                this.posts.push(data);
            })
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
        this.postsCarrier = await fetchPosts();
        runInAction(() => {
            this.tagsInSearch = [];
            this.posts = this.postsCarrier;
        });
    }
    searchByTag(tag: ITag) {
        if (
            this.tagsInSearch.find(
                (tagExisted: ITag) => tag.tagWord === tagExisted.tagWord
            )
        ) {
            return;
        }
        const posts = this.posts.filter((post: IPost) => {
            let result = false;
            post.tags?.forEach((postTag: ITag) => {
                if (postTag.tagWord === tag.tagWord) result = true;
            });
            return result;
        });
        if (!posts) {
            console.error("post's not found, store.ts, str:70");
            return;
        }
        this.tagsInSearch.push(tag);
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
        const { deletedPostId } = await deletePost(postId);
        runInAction(() => {
            this.postsCarrier = this.postsCarrier.filter(
                (post: IPost) => post.postId !== deletedPostId
            );
            this.posts = this.posts.filter(
                (post: IPost) => post.postId !== deletedPostId
            );
        });
    }
    deleteTagInUse(tag: string) {
        const tagsForSearch: ITag[] = this.tagsInSearch.filter(
            (tagInSearch: ITag) => {
                return tagInSearch.tagWord !== tag;
            }
        );
        runInAction(() => {
            this.tagsInSearch = [];
        });
        if (tagsForSearch.length) {
            tagsForSearch.forEach((tag: ITag) => {
                this.searchByTag(tag);
            });
            return;
        }
        runInAction(() => {
            this.posts = this.postsCarrier;
        });
    }
    public get getPosts() {
        return toJS(this.posts);
    }
    public get tagsInUse() {
        return toJS(this.tagsInSearch);
    }
}

export default new PostsStore();
