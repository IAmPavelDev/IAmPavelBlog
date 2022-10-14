export interface IPost {
    title: string;
    content?: string;
    preview: string;
    tags?: Array<{ tagWord: string; id: string }>;
    creationDate?: Date;
    postId?: string;
}

export interface IUpdatePost {
    title?: string;
    content?: string;
    preview?: string;
    tags?: Array<{ tagWord: string; id: string }>;
    creationDate?: Date;
    postId?: string;
}

export type IPostKey = keyof IPost;
