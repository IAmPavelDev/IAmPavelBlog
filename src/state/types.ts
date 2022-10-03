import { ReactNode } from "react";

export interface postObj {
    title: string;
    content: string;
    tags?: Array<{ tagWord: string; id: string }>;
    creationDate?: Date;
    postId?: string;
}
