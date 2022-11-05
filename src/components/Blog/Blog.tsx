import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import Tag from "../../Elements/Tag";
import store from "../../state/store";
import { IPost, ITag } from "../../types";
import Search from "../Search/Search";
import style from "./Blog.module.scss";
import Post from "./Post/Post";
import PostPreview from "./PostPreview/PostPreview";

// const PostList = observer(() => {
//   const posts = store.getPosts.length ? (
//     store.getPosts
//       .map((post: IPost) => {
//         const id = uuid().slice(0, 8);
//         return (
//           <div key={id} id={id} className={style.blog__post}>
//             <Post
//               contentEditable={false}
//               tags={post.tags}
//               preview={post.preview}
//               title={post.title}
//               postId={post.postId}
//               previewImage={post.previewImage}
//               parentId={id}
//               parentStyle={style}
//             />
//           </div>
//         );
//       })
//       .reverse()
//   ) : (
//     <p>Loading...</p>
//   );
//   return <div className={style.blog}>{posts}</div>;
// });

// const TagsInSearch = observer(() => {
//   return (
//     <div className={style.filterTags}>
//       {store.tagsInUse.map((tag: ITag) => {
//         return <Tag key={tag.id} removable tagData={tag.tagWord} />;
//       })}
//     </div>
//   );
// });

const PostsList = observer(() => {
  const posts = store.getPosts.length ? (
    store.getPosts
      .map((post: IPost) => {
        const id = uuid().slice(0, 8);
        return (
          <div key={id} id={id} className={style.blog__post}>
            <PostPreview
              imageUrl={post.previewImage}
              date={post.creationDate}
              title={post.title}
              preview={post.preview}
              tags={post.tags}
            />
          </div>
        );
      })
      .reverse()
  ) : (
    <p>Loading...</p>
  );
  return <div className={style.blog}>{posts}</div>;
});

const Blog = () => {
  useEffect(() => {
    store.loadPosts();
  });
  return (
    <div className={style.wrapper}>
      <PostsList />
    </div>
  );
};

export default Blog;
