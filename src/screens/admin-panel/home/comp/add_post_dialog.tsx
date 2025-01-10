"use client";

import clsx from "clsx";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import RootOverlay from "@/components/overlay/overlay";
import PostModel from "@/interfaces/post";
import { Dispatch, SetStateAction } from "react";
import useHttpRequest from "../../../../hooks/api/useApiRequest";
import { PageType, Post } from "../interfaces/interfaces";
import { onAddNewPostList } from "../logics/logics";

interface AddPostDialogProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  edition: string;
  openDialog: boolean;
  setSectionData: Dispatch<SetStateAction<PageType>>;
  sectionIndex: number;
  sectionData: PageType;
}

const AddPostDialog: React.FC<AddPostDialogProps> = (props) => {
  const { sendRequest, data, loading } = useHttpRequest();

  const [selectedPost, setSelectedPost] = useState<Post[]>([]);

  const sections = props.sectionData.sections;

  useEffect(() => {
    const getSortedPosts = async () => {
      const searchParams = new URLSearchParams({
        edition: props.edition,
      });
      try {
        await sendRequest(`/api/admin/post?${searchParams}`, {
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      }
    };
    getSortedPosts();
  }, [props.edition, sendRequest]);

  return (
    <RootOverlay
      onBackdropClick={() => props.setOpenDialog(false)}
      useBackdrop={props.openDialog}
      className={clsx(
        "bg-gray-200 dark:bg-gray-800 w-full h-[80%] bottom-0 left-0 px-2 pt-2 transform overflow-y-scroll transition-300",
        "sm:h-[70%] sm:w-[80%] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
        "md:h-[35rem] md:w-[40rem]",
        "lg:h-[45rem] lg:w-[50rem]",
        {
          "translate-y-0 sm:-translate-y-1/2 visible": props.openDialog,
          "translate-y-full sm:translate-y-full hidden": !props.openDialog,
        }
      )}
    >
      <>
        <div className="w-full flex flex-row justify-between">
          <p className="text-base font-semibold">
            Select Post (Section Max - 5)
          </p>
          <button
            onClick={() => {
              onAddNewPostList(
                props.setSectionData,
                selectedPost,
                props.sectionIndex
              );
              props.setOpenDialog(false);
              setSelectedPost([]);
            }}
            className={clsx("px-6 py-1 rounded-md")}
          >
            Add
          </button>
        </div>
        <div className="mt-5 w-full">
          <ul className="w-full flex flex-col">
            {loading || !data ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <LoadingSpinner className="w-6 h-6 fill-primary-default" />
                <p className="text-sm font-medium animate-pulse mt-2">
                  Loading...
                </p>
              </div>
            ) : (
              sections.length > 0 &&
              (data as PostModel[]).map((post) => {
                return (
                  <li
                    key={post._id}
                    onClick={() => {
                      if (
                        selectedPost.some((item) => item.postId === post._id)
                      ) {
                        setSelectedPost((prev) =>
                          prev.filter((item) => item.postId !== post._id)
                        );
                      } else {
                        setSelectedPost((prev) => [
                          ...prev,
                          {
                            postId: post._id,
                            title: post.title,
                            thumbnail: post.thumbnail,
                            highlight: false,
                          },
                        ]);
                      }
                    }}
                    className={clsx(
                      "w-full h-20 bg-gray-200 dark:bg-gray-700 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)] rounded-md flex flex-row mb-2 transition-300",
                      {
                        "opacity-40": selectedPost.some(
                          (item) => item.postId === post._id
                        ),
                      }
                    )}
                  >
                    <div className="h-full w-20 min-w-20 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt="article thumbnail"
                        height={200}
                        width={200}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden h-full ml-2 justify-between py-2">
                      <p className="text-sm line-clamp-2 overflow-hidden text-ellipsis ">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        Published Date :{" "}
                        {moment(post.updatedAt).format(
                          "DD MMM YYYY, h:mm:ss a"
                        )}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </>
    </RootOverlay>
  );
};

export default AddPostDialog;
