"use client";

import clsx from "clsx";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "../../i18n/routing";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import PostModel from "@/interfaces/post";
import useHttpRequest from "../../hooks/api/useApiRequest";

interface SearchResultScreenProps {
  searchText: string;
  edition: string;
}

const SearchResultScreen: React.FC<SearchResultScreenProps> = (props) => {
  const { sendRequest, data, loading } = useHttpRequest();
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>(
    decodeURIComponent(props.searchText)
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      router.push(`/${props.edition}/search/${inputValue}`);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        await sendRequest(`/api/search-posts?searchText=${props.searchText}`, {
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [sendRequest, props.searchText]);

  return (
    <div
      className={clsx(
        "w-screen px-4 flex flex-col mt-20",
        "min-[500px]:w-[25rem] min-[600px]:w-[29rem] sm:w-[31rem] lg:w-[42rem] xl:w-[50rem] min-[400px]:mx-auto"
      )}
    >
      <div className="w-full h-10">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={inputValue}
          className="w-full h-full outline-none border border-gray-300 bg-transparent dark:border-slate-600 px-2 font-bold"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul className={clsx("w-full flex flex-col mt-4")}>
        {isLoading ? (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <LoadingSpinner className="w-8 h-8 fill-primary-default" />
          </div>
        ) : data && (data as PostModel[]).length > 0 ? (
          <>
            {(data as PostModel[]).map((post) => {
              return (
                <li key={post._id} className="w-full mb-6">
                  <Link
                    href={`/post/${post.slug}`}
                    className="w-full flex flex-row"
                  >
                    <div className="w-full flex flex-col">
                      <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                        {moment(post.updatedAt).format(
                          "MMM DD, YYYY , h:mm:s a"
                        )}
                      </p>
                      <h1 className="text-base font-bold text-blue-500 dark:text-blue-400">
                        {post.title}
                      </h1>
                      <p className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-400">
                        written by : {post.publisherName}
                      </p>
                      <div
                        className="text-xs mt-2 line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: post.article }}
                      />
                    </div>
                    <div className="w-32 h-full aspect-square relative overflow-hidden max-lg:hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </>
        ) : (
          <div className="w-full h-[70vh] flex flex-col justify-center items-center px-4">
            <div className="w-full h-60 relative overflow-hidden">
              <Image
                src={
                  "https://cdni.iconscout.com/illustration/premium/thumb/data-not-found-illustration-download-in-svg-png-gif-file-formats--message-empty-communication-emptystate-no-pack-design-development-illustrations-9404367.png"
                }
                alt=""
                height={200}
                width={200}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-bold text-center">No Result Found!</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchResultScreen;
