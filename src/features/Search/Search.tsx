import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { ITag } from "shared/types";
import TagCard from "shared/ui/TagCard";
import { store } from "shared/store";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getTagById } from "shared/api/tags/getTagById";
import { fetchTags } from "shared/api/tags/fetchTags";
import { AnimatePresence, motion } from "framer-motion";

type searchStateT = { tags: ITag[]; query: string };

let timeout: ReturnType<typeof setTimeout>;
function diffSetQuery(query: string) {
  clearTimeout(timeout);
  timeout = setTimeout(
    () => store.postStore.search(query, store.postStore.getSearchQuery.tags),
    300
  );
}

const SearchForm = observer(() => {
  const [suggestedTags, setSuggestedTags] = useState<ITag[]>([]);

  const [query, setQuery] = useState<string>();

  useEffect(() => {
    diffSetQuery(query ?? "");
  }, [query]);

  useEffect(() => {
    (async () => {
      const feed = await fetchTags(store.postStore.getSearchQuery.query);
      setSuggestedTags(
        feed.filter((f) =>
          store.postStore.getSearchQuery.tags.every((t) => t.id !== f.id)
        )
      );
    })();
  }, [
    store.postStore.getSearchQuery.tags,
    store.postStore.getSearchQuery.query,
  ]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.wrapper__input}
        type="text"
        value={query ?? ""}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className={styles.wrapper__tags}>
        <AnimatePresence mode={"sync"}>
          {store.postStore.getSearchQuery.tags.map((tag: ITag, id: number) => (
            <motion.div
              key={id + tag.id}
              layout
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0.5 }}
            >
              <TagCard
                type={"dark"}
                text={tag.content}
                className={styles.tags__used}
                id={tag.id}
                onClick={() => {
                  store.postStore.search(
                    store.postStore.getSearchQuery.query,
                    store.postStore.getSearchQuery.tags.filter(
                      (t: ITag) => t.id !== tag.id
                    )
                  );
                }}
              />
            </motion.div>
          ))}
          {Array.isArray(suggestedTags) &&
            suggestedTags.map((tag: ITag) => (
              <motion.div
                layout
                key={tag.id}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0.5 }}
              >
                <TagCard
                  type={"dark"}
                  text={tag.content}
                  className={styles.tags__suggested}
                  id={tag.id}
                  onClick={() => {
                    (!store.postStore.getSearchQuery.tags ||
                      store.postStore.getSearchQuery.tags.every(
                        (t: ITag) => t.id !== tag.id
                      )) &&
                      store.postStore.search(
                        store.postStore.getSearchQuery.query,
                        [...store.postStore.getSearchQuery.tags, tag]
                      );
                  }}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

export const Search = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/search") {
      const query = location.search.split("?").filter((q) => q.length);
      const state: searchStateT = { tags: [], query: "" };
      (async () => {
        for (const search of query) {
          const p = search.split("=");
          if (p[0] === "tag") {
            for (const id of p[1].split("&")) {
              state.tags.push(await getTagById(id));
            }
          }
          if (p[0] === "q") {
            state.query = p[1];
          }
        }
        store.postStore.search(state.query, state.tags);
      })();
    }
  }, [location]);

  return <SearchForm />;
};
