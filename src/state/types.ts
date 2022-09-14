import { ReactNode } from "react";

export interface mobxObj {
    title: string;
    content: string;
    tags?: Array<{ tagWord: string; id: string }>;
}
