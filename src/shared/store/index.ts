import { PostsStore } from "entities/Post/store";

class rootStore {
  public postStore: PostsStore;
  constructor() {
    this.postStore = new PostsStore();
  }
}

export const store = new rootStore();
