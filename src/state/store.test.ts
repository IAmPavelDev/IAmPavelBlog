import { v4 } from "uuid";
import { IPost, IUpdatePost } from "../types";
import store from "./store";

let TestPostId: string;

const testPost: IPost = {
  title: "testtesttest",
  content: "testtesttest",
  preview: "testtesttest",
  tags: [
    { tagWord: "testtesttest", id: v4() },
    { tagWord: "testtesttest", id: v4() },
    { tagWord: "testtesttest", id: v4() },
    { tagWord: "testtesttest", id: v4() },
    { tagWord: "testtesttest", id: v4() },
    { tagWord: "testtesttest", id: v4() },
  ],
  previewImage:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.colourbox.com%2Fpreview%2F4990666-yellow-red-orange-and-green-leaves-of-spiraea-meadowsweet-shrub-hdr.jpg&f=1&nofb=1&ipt=3ea54b39a3c51f6d3f5231a990427d5953e1dd993ae6ea67f3dba12f8892e37b&ipo=images",
};

const updatePostData: IUpdatePost = {
  title: "Updatetesttesttest",
  content: "Updatetesttesttest",
  preview: "Updatetesttesttest",
  tags: [
    { tagWord: "Updatetesttesttest", id: v4() },
    { tagWord: "Updatetesttesttest", id: v4() },
    { tagWord: "Updatetesttesttest", id: v4() },
    { tagWord: "Updatetesttesttest", id: v4() },
    { tagWord: "Updatetesttesttest", id: v4() },
    { tagWord: "Updatetesttesttest", id: v4() },
  ],
};

describe("store methods", () => {
  test("setting posts", () => {
    store.addPosts(testPost).then((res) => {
      const { title, content, preview, postId, tags } = res;
      expect(title).toEqual(testPost.title);
      expect(content).toEqual(testPost.content);
      expect(preview).toEqual(testPost.preview);
      expect(tags).toEqual(testPost.tags);
      TestPostId = postId ?? "";
    });
  });

  test("updating posts", () => {
    TestPostId &&
      store.updatePosts(TestPostId, updatePostData).then((res) => {
        const { title, content, preview, postId, tags } = res ?? {};
        expect({ title, content, preview, postId, tags }).toEqual(
          updatePostData
        );
      });
  });

  // test("content loader", () => {
  //   store.loadContent(TestPostId).then((content) => {
  //     expect(typeof content).toBe("string");
  //   });
  //   store.loadContent(v4()).then((content) => {
  //     expect(content).toBe(undefined);
  //   });
  // });

  test("posts loader", () => {
    store.loadPosts().then((response) => {
      expect(typeof response).toBe("IPost[]");
    });
  });

  test("search", () => {
    store.loadPosts().then((response: IPost[]) => {
      const postRnd = response[Math.floor(Math.random() * 9)]; //geting random post
      expect(postRnd).toBeTruthy();

      test("search by all", () => {
        store.searchPost(postRnd.content ?? "", "all");
        expect(
          store.getPosts.find((post) => post.postId === postRnd.postId)
        ).toEqual(postRnd);
      });

      test("search by content", () => {
        store.searchPost(postRnd.content ?? "", "content");
        expect(
          store.getPosts.find((post) => post.postId === postRnd.postId)
        ).toEqual(postRnd);
      });

      test("search by preview", () => {
        store.searchPost(postRnd.preview ?? "", "preview");
        expect(
          store.getPosts.find((post) => post.postId === postRnd.postId)
        ).toEqual(postRnd);
      });

      test("search by title", () => {
        store.searchPost(postRnd.title ?? "", "title");
        expect(
          store.getPosts.find((post) => post.postId === postRnd.postId)
        ).toEqual(postRnd);
      });
    });
  });

  test("removing posts", () => {
    TestPostId && store.deletePost(TestPostId);
    expect(
      store.getPosts.find((post: IPost) => post.postId === TestPostId)
    ).toBe(undefined);
  });
});
