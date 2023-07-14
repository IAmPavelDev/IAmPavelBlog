import { Box, TextField } from "@mui/material";
import { ITag } from "shared/types";
import TagCard from "shared/ui/TagCard";
import styles from "./Create.module.scss";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { fetchTags } from "shared/api/tags/fetchTags";
import { createTag } from "shared/api/tags/createTag";

export const TagsEditor: FC<{
  pushTags: (tag: ITag[]) => void;
  defaultTags: ITag[];
}> = ({ pushTags, defaultTags }) => {
  const [tags, setTags] = useState<ITag[]>(defaultTags ?? []);

  const [suggests, setSuggests] = useState<ITag[]>([]);
  const tag = useRef<any>(null);

  useEffect(() => {
    pushTags(tags);
  }, [tags]);

  function tagsSuggest(query: string) {
    fetchTags(query).then((tags: ITag[]) => {
      console.log(tags);
      setSuggests(tags);
    });
  }

  function creationNeeded() {
    return (
      suggests.findIndex((suggest: ITag) => {
        if (suggest.content === tag.current.value) return true;
      }) === -1
    );
  }

  function createNewTag() {
    createTag(tag.current.value).then((tag: ITag) => {
      console.log(tag);
      setTags((prev) => [...prev, tag]);
    });
  }

  return (
    <Box>
      tags:
      {tags.map((tag: ITag) => {
        return (
          <div
            key={tag.id}
            onClick={() => {
              setTags((prev: ITag[]) =>
                prev.filter((prevTag: ITag) => prevTag.id !== tag.id)
              );
            }}
          >
            <TagCard type="dark" text={tag.content} />
          </div>
        );
      })}
      <div className={styles.tagSearch}>
        <TextField
          inputRef={tag}
          onChange={(e: ChangeEvent) => {
            tagsSuggest((e.target as HTMLTextAreaElement).value);
          }}
          className={styles.wrapper__field}
          inputProps={{
            className: styles.wrapper__innerField,
            maxLength: 15,
          }}
        />
        <div className={styles.tagSearch__suggests}>
          {!!tag.current?.value &&
            suggests.map((suggestedTag: ITag) => {
              return (
                <div
                  onClick={() => {
                    setTags((prev) => [...prev, suggestedTag]);
                    setSuggests([]);
                    tag.current.value = null;
                  }}
                >
                  <TagCard type="dark" text={suggestedTag.content} />
                </div>
              );
            })}
          {!!tag.current?.value && creationNeeded() && (
            <div onClick={createNewTag}>
              Create new tag: {tag.current.value}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};
