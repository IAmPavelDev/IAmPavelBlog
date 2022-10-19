import { toJS } from "mobx";
import { IPost, ITag } from "./types";

export default function searchByTag(tag:ITag, tagsInSearch: ITag[], allPosts: IPost[]) {
    if (
        tagsInSearch.find(
            (tagExisted: ITag) => tag.tagWord === tagExisted.tagWord
        )
    ) {
        return;
    }
    const result = allPosts.filter((post: IPost) => {
        let result = false;
        console.log(toJS(post))
        post.tags?.forEach((postTag: ITag) => {
            if (postTag.tagWord === tag.tagWord) result = true;
        });
        return result;
    });
    if (!result) {
        console.error("post's not found, store.ts, str:70");
        return;
    }
    return result;
}