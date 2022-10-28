import { IPost, ITag } from "../types";

export default function searchByTag(
  tag: ITag,
  tagsInSearch: ITag[],
  allPosts: IPost[]
) {
  if (
    tagsInSearch.find((tagExisted: ITag) => tag.tagWord === tagExisted.tagWord)
  ) {
    return;
  }
  const result = allPosts.filter((post: IPost) => {
    return (
      post.tags?.findIndex(
        (postTag: ITag) => postTag.tagWord === tag.tagWord
      ) !== -1
    );
  });
  if (!result) {
    console.error("post's not found");
    return;
  }
  return result;
}
