import { ITag } from "./ITag";

export interface IPost {
  title: string;
  content?: string;
  preview: string;
  tags: Array<ITag>;
  creationDate?: Date;
  postId?: string;
  previewImage: string;
  previewImagePlaceholder: string;
  views?: Array<string>;
  likes?: Array<string>;
}
