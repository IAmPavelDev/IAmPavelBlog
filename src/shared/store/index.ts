import { PostsStore } from "entities/Post/store";
import { UserStore } from "entities/User/store";

class rootStore {
  public postStore: PostsStore;
  public userStore: UserStore;
  constructor() {
    this.postStore = new PostsStore();
    this.userStore = new UserStore();
  }
}

export const store = new rootStore();
