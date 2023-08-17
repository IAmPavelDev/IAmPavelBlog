import { IPost, ITag, IUpdatePost, SearchQueryT } from "shared/types";
import { fetchPosts } from "shared/api/posts/fetchPosts";
import {
  getPostContentById,
  getPostDataById,
} from "shared/api/posts/getPostDataById";
import { createPost } from "shared/api/posts/create-posts";
import { updatePost } from "shared/api/posts/update-posts";
import { deletePost } from "shared/api/posts/delete-post";
import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { useNavigate } from "react-router-dom";

export class PostsStore {
  cachedPost: IPost | null = null;
  posts: IPost[] = [];
  searchQueryParams: {
    tags: ITag[];
    query: string;
  } = { tags: [], query: "" };
  postsFetchingState: {
    lastFetchedPage: number;
    isFetching: boolean;
    currentFetchingPage: number;
    totalPosts: number;
  } = {
    lastFetchedPage: 0,
    isFetching: false,
    currentFetchingPage: 0,
    totalPosts: 1,
  };

  constructor() {
    makeObservable(this, {
      cachedPost: observable,
      searchQueryParams: observable,
      postsFetchingState: observable,
      posts: observable,
      add: action,
      load: action,
      update: action,
    });
  }

  public get getCurrentFetchingState() {
    return this.postsFetchingState;
  }

  public get getSearchQuery() {
    return this.searchQueryParams;
  }

  public get getPostsIdsToDisplay(): string[] {
    return this.posts.map((post: IPost) => {
      if (!post.postId) throw new Error("post id not found");
      return post.postId;
    });
  }

  public async getPostPreviewDataById(id: string) {
    const post = this.posts.find((post: IPost) => post.postId === id);

    if (!post) {
      const serverPost = await fetchPosts(1, id, []);
      return serverPost.data[0];
    }
    return post;
  }

  public async getPostById(id: string): Promise<IPost> {
    if (this.posts) {
      const localPostId = this.posts.findIndex(
        (post: IPost) => post.postId === id
      );
      if (localPostId !== -1) {
        if (this.posts[localPostId].content) {
          return toJS(this.posts[localPostId]);
        }

        const c = await getPostContentById(id);

        this.posts[localPostId].content = c;

        console.log(c);

        return toJS(this.posts[localPostId]);
      }
    }
    return await getPostDataById(id);
  }

  public get adminCreatedPost() {
    return toJS(this.cachedPost);
  }

  public set cachePost(post: IPost) {
    runInAction(() => {
      this.cachedPost = post;
    });
  }

  async add(post: IPost) {
    return createPost(post)
      .then((data) => {
        this.posts.push(data);
        return data;
      })
      .catch(() => console.error("Failed to fetch"));
  }

  async load(page: number) {
    if (
      this.postsFetchingState.totalPosts > this.posts.length &&
      (page > this.postsFetchingState.currentFetchingPage ||
        (!this.postsFetchingState.isFetching &&
          page > this.postsFetchingState.lastFetchedPage))
    ) {
      runInAction(() => {
        this.postsFetchingState.currentFetchingPage = page;
        this.postsFetchingState.isFetching = true;
      });

      const response = await fetchPosts(
        page,
        this.searchQueryParams.query,
        this.searchQueryParams.tags.map((t) => t.id)
      );

      if (response.page === page) {
        runInAction(() => {
          this.posts = [...this.posts, ...response.data];
          this.postsFetchingState.lastFetchedPage = response.page;
          this.postsFetchingState.isFetching = false;
          this.postsFetchingState.totalPosts = response.total;
        });
      }

      return response.data;
    }
  }

  async search(query: string, tags: ITag[], doReplace: boolean = true) {
    runInAction(() => {
      this.searchQueryParams = { tags, query };
    });

    const tagIds = this.searchQueryParams.tags.map((t) => t.id);
    if (doReplace) {
      window.history.pushState(
        null,
        "IAmPaul",
        "/search" +
          (tagIds.length ? "?tag=" + tagIds.join("&") : "") +
          (query ? "?q=" + this.searchQueryParams.query : "")
      );
    }
    const foundPosts = await fetchPosts(1, query, tagIds);
    runInAction(() => {
      this.postsFetchingState.lastFetchedPage = foundPosts.page;
      this.posts = foundPosts.data;
    });
  }

  async update(postId: string, newData: IUpdatePost) {
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
      });
      return server;
    });
  }

  async delete(postId: string) {
    const { deletedPostId } = await deletePost(postId);
    runInAction(() => {
      this.posts = this.posts.filter(
        (post: IPost) => post.postId !== deletedPostId
      );
    });
  }
}
