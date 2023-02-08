import { IPost } from "./IPost";

export interface IFetchData {
  data: IPost[];
  total: number;
  page: number;
}
