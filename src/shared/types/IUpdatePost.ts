import { ITag } from "./ITag";

export interface IUpdatePost {
  title?: string;
  content?: string;
  preview?: string;
  tags?: Array<ITag>;
  creationDate?: Date;
  postId?: string;
  previewImage?: string;
  previewImagePlaceholder?: string;
}
