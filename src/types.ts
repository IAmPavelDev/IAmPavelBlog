export interface ITag {
  tagWord: string;
  id: string;
}

export interface IPost {
  title: string;
  content?: string;
  preview: string;
  tags?: Array<ITag>;
  creationDate?: Date;
  postId?: string;
  previewImage: string;
}

export interface IUpdatePost {
  title?: string;
  content?: string;
  preview?: string;
  tags?: Array<ITag>;
  creationDate?: Date;
  postId?: string;
  previewImage?: string;
}

export interface IFetchData {
  data: IPost[];
  total: number;
  page: number;
}

export type IPostKey = keyof IPost;
