import clsx from "clsx";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import PostModel from "../../../interfaces/post";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import useHttpRequest from "../../../hooks/api/useApiRequest";

interface ManagePostsProps {}

const ManagePosts: React.FC<ManagePostsProps> = (props) => {
  const { sendRequest, loading } = useHttpRequest<PostModel[]>();

  const [postList, setPostList] = useState<PostModel[]>([]);
  const [selectedEditoin, setSelectedEdition] = useState<string>("gl");

  useEffect(() => {
    const fetchSortedPosts = async () => {
      try {
        const result = await sendRequest(
          `/api/admin/post?edition=${selectedEditoin}`,
          {
            method: "GET",
          }
        );
        setPostList(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSortedPosts();
  }, [selectedEditoin, sendRequest]);

  return (
    <div className="px-2 pt-2 flex flex-col">
      <h1 className="text-lg font-bold font-ralway">Manage Posts</h1>
      <ul className="mt-4 flex flex-row">
        <li className="mr-2">
          <button
            onClick={() => setSelectedEdition("gl")}
            className={clsx(
              "px-3 py-1 rounded-full font-medium transition-300",
              {
                "bg-primary-tints-500 dark:bg-primary-shades-700":
                  selectedEditoin === "gl",
              }
            )}
          >
            Global
          </button>
        </li>
        <li>
          <button
            onClick={() => setSelectedEdition("bd")}
            className={clsx(
              "px-3 py-1  rounded-full font-medium transition-300",
              {
                "bg-primary-tints-500 dark:bg-primary-shades-700":
                  selectedEditoin === "bd",
              }
            )}
          >
            Bangladesh
          </button>
        </li>
      </ul>
      <div className="mt-10 flex flex-col">
        <h3 className="text-base font-medium relative pl-3 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary-tints-500 before:dark:bg-primary-shades-700  before:mr-3">
          Posts For {selectedEditoin === "gl" ? "Global" : "Bangladesh"}
        </h3>
      </div>
      {loading ? (
        <LoadingSpinner className="w-8 h-8 fill-primary-default mt-10" />
      ) : !postList || postList?.length === 0 ? (
        <p className="mt-4">
          No posts found! Please add post to{" "}
          {selectedEditoin === "gl" ? "Global" : "Bangladesh"} see here
        </p>
      ) : (
        <ul className="mt-6 flex flex-col md:flex-row md:flex-wrap relative">
          {postList?.map((item, index) => {
            return (
              <PostCard
                key={index}
                post={item}
                setPostList={setPostList}
                index={index}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ManagePosts;

const PostCard = ({
  post,
  setPostList,
  index,
}: {
  post: PostModel;
  setPostList: React.Dispatch<SetStateAction<PostModel[]>>;
  index: number;
}) => {
  const { sendRequest } = useHttpRequest();

  const handleDeletePost = async () => {
    let deletedPost: PostModel = post;
    try {
      setPostList((prev) => prev.filter((p) => p._id !== post._id));
      await sendRequest("/api/admin/post?id=" + post._id, { method: "DELETE" });
    } catch (error) {
      setPostList((prev) => {
        const updatedList = [...prev];
        updatedList[index] = deletedPost;
        return updatedList;
      });
      console.error(error);
    }
  };

  return (
    <li className="w-full md:w-[30rem] bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-row py-2 px-2 mb-2 md:mx-3 md:my-3">
      <div className="w-20 h-20 min-w-20 relative overflow-hidden rounded-md">
        <Image
          src={post.thumbnail}
          alt="test"
          height={200}
          width={200}
          priority
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col ml-2">
        <div className="flex flex-col">
          <p className="text-sm font-semibold line-clamp-3">{post.title}</p>
          <p className="text-[12px] mt-1">
            Published By : {post.publisherName}
          </p>
        </div>
        <button
          onClick={() => handleDeletePost()}
          className="bg-red-400 dark:bg-red-700 mt-3 py-1 rounded-md font-medium"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
