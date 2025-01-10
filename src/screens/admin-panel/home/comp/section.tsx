import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import Image from "next/image";
import { BsFillLightbulbFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { IoRemove } from "react-icons/io5";
import { PageType } from "../interfaces/interfaces";
import {
  onHighlightPostClick,
  onPiorityChange,
  onRemovePostClick,
  onRemoveSectionClick,
  onTitleChange,
} from "../logics/logics";

const Section = ({
  sectionData,
  index,
  setSectionData,
  onAddPostClick,
}: {
  sectionData: PageType;
  setSectionData: Dispatch<SetStateAction<PageType>>;
  onAddPostClick: () => void;
  index: number;
}) => {
  return (
    <>
      <div className="w-full lg:w-[32rem] px-2 my-3">
        <div className="w-full bg-gray-200 dark:bg-gray-900 drop-shadow-lg flex flex-col rounded-lg py-2 relative overflow-hidden">
          <button
            onClick={() =>
              onRemoveSectionClick(setSectionData, sectionData, index)
            }
            className="fixed top-2 right-2 bg-red-400 p-1 rounded-full"
          >
            <GrClose />
          </button>
          <div className="w-full px-2 flex flex-col mt-4">
            <label htmlFor="title" className="text-sm font-medium">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title..."
              value={sectionData.sections[index].title}
              onChange={(e) => onTitleChange(e, setSectionData, index)}
              className="w-full h-full border border-gray-400 rounded-full py-2 px-2 outline-none bg-transparent mt-1"
            />
          </div>
          <div className="w-full px-2 flex flex-col mt-2">
            <label htmlFor="title" className="text-sm font-medium">
              Piority Number
            </label>
            <input
              type="number"
              name="title"
              id="title"
              maxLength={2}
              placeholder="Title..."
              value={sectionData.sections[index].piority}
              onChange={(e) => onPiorityChange(e, setSectionData, index)}
              className="w-full h-full border border-gray-400 rounded-full py-2 px-2 outline-none bg-transparent mt-1"
            />
          </div>
          <div className="w-full mt-2 mb-2 px-2 flex flex-col">
            <label htmlFor="post" className="text-sm font-medium mt-1">
              Posts
            </label>
            {sectionData.sections[index].posts.map((post, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-14 bg-gray-300 dark:bg-gray-800 rounded-md my-1 flex flex-row justify-between items-center px-2 relative overflow-hidden"
                >
                  <div className="h-10 w-20 relative rounded-md overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      height={80}
                      width={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="line-clamp-1 ml-2">{post.title}</div>
                  <div className="h-full flex flex-row">
                    <button
                      onClick={() =>
                        onHighlightPostClick(setSectionData, index, idx)
                      }
                      className="h-full px-2"
                    >
                      <BsFillLightbulbFill
                        size={20}
                        className={clsx({
                          "fill-primary-default": post.highlight,
                        })}
                      />
                    </button>
                    <button
                      onClick={() =>
                        onRemovePostClick(setSectionData, index, post)
                      }
                      className="h-full px-2"
                    >
                      <IoRemove size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-2 flex flex-col justify-center items-center">
            <button
              onClick={onAddPostClick}
              className="bg-primary-tints-500 dark:bg-primary-shades-700 px-4 py-1 rounded-md drop-shadow-lg"
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
