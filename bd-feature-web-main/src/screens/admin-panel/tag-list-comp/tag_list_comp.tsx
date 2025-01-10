"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import CustomTextFiled from "../text-field/text_field";

interface TagListCompProps {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}

const TagLitsComp: React.FC<TagListCompProps> = (props) => {
  const [tag, setTag] = useState<string>("");

  return (
    <div
      className="w-full flex
         flex-col mt-4"
    >
      <div className="mb-4 flex flex-row flex-wrap">
        {props.tags.map((tag, index) => {
          return (
            <button
              onClick={() => {
                props.setTags((prev) => prev.filter((t) => t !== tag));
              }}
              key={index}
              className="bg-primary-tints-300 dark:bg-primary-shades-500 px-2 py-1 rounded-md text-sm font-medium mx-1 my-2"
            >
              {tag}
            </button>
          );
        })}
      </div>
      <CustomTextFiled
        onTextChange={(e) => {
          setTag(e.target.value);
        }}
        label="Add Tags"
        value={tag}
        placeholder="tags..."
      />
      <div className="w-full flex flex-col items-center justify-center mt-2">
        <button
          onClick={() => {
            props.setTags((prev) => [...prev, tag]);
            setTag("");
          }}
          className={clsx(
            "px-8 py-2 rounded-md drop-shadow-lg cursor-pointer transition-300",
            {
              "bg-primary-tints-400 dark:bg-primary-shades-600 opacity-100":
                tag.length !== 0,
              "bg-slate-200 dark:bg-slate-700 drop-shadow-none opacity-45 cursor-not-allowed":
                tag.length === 0,
            }
          )}
          disabled={tag.length === 0}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagLitsComp;
