import { ReactNode } from "react";

export type PostCreateForm = {
  title: string;
  preview: string;
};

export type Tag = {
  content: ReactNode;
  tagWord: string;
  id: string;
};
