import { IPost } from "../types";

export default function searchLocal(
    store: IPost[],
    data: string,
    type: string
): IPost[] {
    const result: IPost[] = [];
    const searcher = new RegExp(data, "i");
    const searchTypeFlag = (key: string) =>
        type === "all"
            ? key === ("title" || "preview" || "content")
            : type === key;
    for (let i = 0; i < store.length; i++) {
        if (!result.includes(store[i])) {
            for (let [key, field] of Object.entries(store[i])) {
                if (
                    typeof field === "string" &&
                    searchTypeFlag(key) &&
                    searcher.test(field)
                ) {
                    if (!result.includes(store[i])) {
                        result.push(store[i]);
                    }
                }
            }
        }
    }
    return result;
}
