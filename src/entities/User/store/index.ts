import { makeObservable, observable, runInAction, toJS } from "mobx";
import { IUser } from "shared/types";

import { login } from "shared/api/users/login";
import sessionAuthorize from "shared/api/users/session-authorize";

export class UserStore {
  user: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
    });
  }

  async login(username: string, password: string) {
    const { user } = await login({ username, password });
    if (user) {
      runInAction(() => {
        this.user = user;
      });
      return toJS(this.user);
    }
  }

  async sessionEntrance() {
    const user = await sessionAuthorize();
    runInAction(() => {
      this.user = user;
    });
  }

  pushToLikes(postId: string) {
    if (this.user !== null && this.user.likes) {
      const { likes } = toJS(this.user);
      runInAction(() => {
        this.user &&
          (this.user.likes = Array.from(new Set([...likes, postId])));
      });
    }
  }

  removeFromLikes(postId: string) {
    if (this.user !== null && this.user.likes) {
      const { likes } = this.user;
      runInAction(() => {
        this.user &&
          (this.user.likes = likes.filter((like: string) => like !== postId));
      });
    }
  }

  async getUserData() {
    if (!this.user) {
      await this.sessionEntrance();
    }
    return toJS(this.user) as IUser;
  }
}
