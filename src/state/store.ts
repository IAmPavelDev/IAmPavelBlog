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
import searchLocal from "./search";
import searchByTag from "./searchByTag";
import { IPost, ITag, IUpdatePost } from "../types";

class PostsStore {
  posts: IPost[] = [];
  postsCarrier: IPost[] = [];
  tagsInSearch: ITag[] = [];
  page: number = 1;
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
      .catch(() => console.error("Failed to fetch"));
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
          throw new Error("PostId and response postId not the same");
        }
        runInAction(() => {
          this.posts.forEach((post: IPost) => {
            if (post.postId === postId) {
              post.content = response.content;
            }
          });
          this.postsCarrier.forEach((post: IPost) => {
            if (post.postId === postId) {
              post.content = response.content;
            }
          });
        });
        return response.content;
      }
    );
  }
  async loadPosts() {
    const response = await fetchPosts(this.page);
    if (response.page === this.page) {
      this.page = +1;
      runInAction(() => {
        this.tagsInSearch = [];
        this.postsCarrier = response.data;
        this.posts = response.data;
      });
    }
  }
  async searchPost(data: string, type: string) {
    if (!data) {
      runInAction(() => {
        this.posts = this.postsCarrier;
      });
      if (this.tagsInSearch.length) {
        this.tagsInSearch.forEach((tag: ITag) => {
          this.searchByTag(tag);
        });
      }
      return;
    }
    const localAvailable = searchLocal(this.postsCarrier, data, type);
    const localIds: string[] = localAvailable.map((post: IPost) =>
      post.postId ? post.postId : ""
    );
    console.log("localAvailable-->", localAvailable);
    console.log("localIds-->", localIds);

    const restOnServer = await fetchPosts(this.page, data, localIds);

    console.log("restOnServer--> ", restOnServer);

    runInAction(() => {
      if (restOnServer)
        this.postsCarrier = [...this.postsCarrier, ...restOnServer.data];
      this.posts = restOnServer
        ? [...localAvailable, ...restOnServer.data]
        : localAvailable;
    });
  }
  searchByTag(tag?: ITag) {
    if (!tag) {
      this.tagsInSearch.forEach((t: ITag) => {
        this.searchByTag(t);
      });
      return;
    }
    const postsWithNeededTag: IPost[] | undefined = searchByTag(
      tag,
      this.tagsInSearch,
      this.postsCarrier
    );
    if (postsWithNeededTag?.length) {
      if (
        !this.tagsInSearch.find(
          (tagExisted: ITag) => tag.tagWord === tagExisted.tagWord
        )
      ) {
        this.tagsInSearch.push(tag);
      }
      runInAction(() => {
        this.posts = postsWithNeededTag;
      });
    }
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
