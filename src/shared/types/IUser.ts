export interface IUser {
  userId: string;

  username: string;

  email: string;

  isAdmin: boolean;

  isRegistered: boolean;

  views: Array<string>;

  likes: Array<string>;
}
