import { makeObservable, observable, runInAction, toJS } from "mobx";
import { IUser } from "shared/types";

import { login } from "shared/api/users/login";

export class UserStore {
  user: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
    });
  }

  async login(username: string, password: string) {
    const userData = await login({ username, password });
    if (userData) {
      runInAction(() => {
        this.user = userData;
      });
      return toJS(this.user);
    }
  }
}
