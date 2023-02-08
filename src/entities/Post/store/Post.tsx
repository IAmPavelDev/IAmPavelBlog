import { IUpdatePost } from "shared/types/IUpdatePost";
import { IPost } from "shared/types/IPost";
import { ITag } from "shared/types/ITag";

import { createPost } from "shared/api/posts/create-posts";
import { fetchPosts } from "shared/api/posts/fetchPosts";
import { updatePost } from "shared/api/posts/update-posts";
import { getPostById } from "shared/api/posts/get-post-by-id";
import { deletePost } from "shared/api/posts/delete-post";

import LocalSearch from "./LocalSearch";
import searchByTag from "./SearchByTag";

import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from "mobx";

export class PostsStore {
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
      getPostsIdsToDisplay: computed,
    });
  }
  async addPosts(post: IPost) {
    return createPost(post)
      .then((data) => {
        this.postsCarrier.push(data);
        this.posts.push(data);
        return data;
      })
      .catch(() => console.error("Failed to fetch"));
  }
  async loadPostById(postId: string): Promise<IPost> {
    const neededPostIndex = this.posts.findIndex(
      (post) => post.postId === postId
    );
    const neededPostCarrierIndex = this.postsCarrier.findIndex(
      (post) => post.postId === postId
    );

    if (
      this.posts[neededPostIndex] &&
      this.postsCarrier[neededPostCarrierIndex] &&
      this.posts[neededPostIndex]?.content
    ) {
      return this.posts[neededPostIndex];
    }

    if (
      this.posts[neededPostIndex] &&
      this.postsCarrier[neededPostCarrierIndex]
    ) {
      return await getPostById(postId, true).then(
        (response: { postId: string; content: string }) => {
          if (response.postId !== postId) {
            throw new Error("PostId and response postId not the same");
          }
          runInAction(() => {
            this.posts[neededPostIndex].content = response.content;

            this.postsCarrier[neededPostCarrierIndex].content =
              response.content;
          });

          return this.posts[neededPostIndex];
        }
      );
    }

    return await getPostById(postId, false).then((response: IPost) => {
      console.log(response);

      if (response.postId !== postId) {
        throw new Error("PostId and response postId not the same");
      }
      runInAction(() => {
        this.posts.push(response);
        this.postsCarrier.push(response);
      });
      return response;
    });
  }
  async loadPosts() {
    const response = await fetchPosts(this.page);
    if (response.page === this.page) {
      this.page = this.page + 1;
      runInAction(() => {
        this.tagsInSearch = [];
        this.postsCarrier = [...this.postsCarrier, ...response.data];
        this.posts = [...this.posts, ...response.data];
      });
    }
    return response.data;
  }

  getCurrentPage() {
    return this.page;
  }
  async searchPost(data: string, type: string) {
    const runTagsSearch = (collectionToSearch?: IPost[]) =>
      this.tagsInSearch && this.searchByTag(undefined, collectionToSearch);

    if (!data) {
      runInAction(() => {
        this.posts = this.postsCarrier;
      });
      runTagsSearch();
      return;
    }
    const localFinded = LocalSearch(this.postsCarrier, data, type);
    const restOfFindedOnServer = await fetchPosts(this.page, data, type);

    runInAction(() => {
      if (restOfFindedOnServer)
        this.postsCarrier = [
          ...this.postsCarrier,
          ...restOfFindedOnServer.data,
        ];
      this.posts = restOfFindedOnServer
        ? [...localFinded, ...restOfFindedOnServer.data]
        : localFinded;
    });
    runTagsSearch(this.posts);
  }

  searchByTag(tag?: ITag, collectionToFilter: IPost[] = this.postsCarrier) {
    if (!tag) {
      this.tagsInSearch.forEach((t: ITag) => {
        this.searchByTag(t);
      });
      return;
    }
    const postsWithNeededTag: IPost[] | undefined = searchByTag(
      tag,
      this.tagsInSearch,
      collectionToFilter
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
    return updatePost(postId, newData).then((server: IPost) => {
      runInAction(() => {
        this.posts[this.posts.indexOf(updatable)] = server;
        this.postsCarrier[this.postsCarrier.indexOf(updatable)] = server;
      });
      return server;
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
  public async getPostById(id: string) {
    //TODO
    const post = this.posts.find((post: IPost) => post.postId === id);
    if (!post) {
      const serverPost = await fetchPosts(1, id);
      console.log(serverPost);
    }
    return post;
  }
  public get getPostsIdsToDisplay() {
    return toJS(this.posts).map((post: IPost) => post.postId);
  }
  public get tagsInUse() {
    return toJS(this.tagsInSearch);
  }
}