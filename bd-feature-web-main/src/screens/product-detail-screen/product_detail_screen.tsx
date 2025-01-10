"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { Link } from "../../i18n/routing";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import TagLink from "@/components/tag-link/tag_link";
import PostModel from "@/interfaces/post";
import moment from "moment";
import { BsTagsFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import useHttpRequest from "../../hooks/api/useApiRequest";
import AdminModel from "../../interfaces/admin";

interface ProductDetailScreenProps {
  post: PostModel;
  author: unknown;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = (props) => {
  const t = useTranslations("post-detail-screen");
  const {
    sendRequest: sendGetSimilarPosts,
    data: similarPosts,
    loading: similarPostLoading,
  } = useHttpRequest();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log(window.location.href);
  };

  useEffect(() => {
    const getSimilarPost = async (postId: string, tags: string[]) => {
      try {
        await sendGetSimilarPosts("/api/similar-posts", {
          method: "POST",
          body: JSON.stringify({ postId: postId, tags: tags }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    getSimilarPost(props.post._id, props.post.tags);
  }, [sendGetSimilarPosts, props.post._id, props.post.tags]);

  return (
    <div className="w-full flex flex-col mt-16 md:mt-2 font-mont">
      <div className="w-full h-60 min-[470px]:h-72 min-[530px]:h-80 sm:h-96 md:h-[28rem] lg:h-[34rem] xl:h-[40rem] bg-gray-200 relative overflow-hidden transition-300">
        <Image
          src={props.post.thumbnail}
          alt={props.post.thumbnailAltText}
          height={1080}
          width={1920}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full px-2 font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl  mt-2 md:w-[50rem] lg:w-[60rem] xl:w-[70rem] md:mx-auto">
        <p className="w-full inline">
          {props.post.title}
          <button className="px-4 py-2 group" onClick={handleCopyToClipboard}>
            <FaRegCopy className="fill-gray-500 group-hover:fill-primary-tints-500 group-active:fill-primary-tints-500" />
          </button>
        </p>
      </div>
      <div className="w-full px-2 mt-2 md:w-[50rem] lg:w-[60rem] xl:w-[70rem] md:mx-auto">
        <p className="text-xs text-gray-500 sm:text-base sm:font-medium">
          Published :{" "}
          {moment(props.post.createdAt).format("MMMM DD YYYY , h:mm:s a")}
        </p>
      </div>
      <div className="w-full px-2 mt-3 md:w-[50rem] lg:w-[60rem] xl:w-[70rem] md:mx-auto">
        <p className="font-medium text-sm sm:text-base lg:hidden">
          Written By :{" "}
          <Link href={`/author/${(props.author as AdminModel).slug}`}>
            <strong>{(props.author as AdminModel).name || "Loading..."}</strong>
          </Link>
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-8 mb-4">
        <div className="w-44 h-[1px] bg-gray-300"></div>
      </div>
      <div className="w-full flex flex-row sm:w-[35rem] md:w-[42rem] lg:w-[55rem] sm:mx-auto">
        <div
          className="w-full lg:w-[75%] px-2 font-medium font-libre"
          dangerouslySetInnerHTML={{ __html: props.post.article }}
        />
        <div className="ml-6 w-[25%] max-lg:hidden max-lg:w-0 max-lg:ml-0 flex flex-col">
          <p className="text-base font-semibold font-ralway relative before:content-[''] before:absolute before:w-28 before:h-[1px] before:bg-gray-400 before:top-7">
            Author
          </p>
          <Link
            href={`/author/${(props.author as AdminModel).slug}`}
            className="mt-5"
          >
            <div className="mt-4 flex flex-row items-start">
              <div className="size-14 min-w-14 rounded-full overflow-hidden relative">
                <Image
                  src={(props.author as AdminModel).profilePic}
                  alt="Author Profile Photo"
                  height={200}
                  width={200}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col ml-2">
                <p className="font-semibold text-base text-primary-tints-600">
                  {(props.author as AdminModel).name}
                </p>
                <p className="text-xs font-medium">
                  {(props.author as AdminModel).work}
                  its to long name
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full sm:w-[35rem] md:w-[42rem] lg:w-[55rem] sm:mx-auto px-2 mt-4">
        <div className="w-full flex flex-row">
          <BsTagsFill size={30} />
          <div className="flex flex-row flex-wrap ml-3 ">
            {props.post.tags.map((tag, index) => {
              return <TagLink key={index} href={`/search/${tag}`} text={tag} />;
            })}
          </div>
        </div>
      </div>

      <div className="w-full sm:w-[35rem] md:w-[42rem] lg:w-[55rem] sm:mx-auto mt-8 px-4">
        <div className="w-full bg-gray-200 dark:bg-gray-900 flex flex-col rounded-lg">
          <p className="text-md font-bold px-2 py-2">{t("before-you-go")}</p>
          <p className="text-sm px-2">{t("description")}</p>
          <div className="w-full flex flex-col justify-center items-center  mt-4 mb-4">
            <Link
              href={"/newsletter/subscribe"}
              className="bg-primary-default w-44 py-2 rounded-full flex flex-col items-center justify-center"
            >
              {t("get-newsletter")}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 px-2 flex flex-col sm:mt-16 md:mt-28 md:w-[50rem] lg:w-[60rem] xl:w-[70rem] md:mx-auto">
        <h1 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl transition-300">
          Read More :
        </h1>
        <div className="w-full flex flex-col md:flex-row md:flex-wrap mt-5 md:mb-10">
          {similarPostLoading || !similarPosts ? (
            <div className="w-full flex flex-col justify-center items-center">
              <LoadingSpinner className="w-7 h-7 fill-primary-default mt-4" />
            </div>
          ) : (
            (similarPosts as PostModel[]).map((post, index) => {
              if (index === 0) {
                return (
                  <div
                    key={post._id}
                    className="w-full min-[410px]:w-[22rem] min-[480px]:w-[26rem] min-[550px]:w-[30rem] min-[410px]:mx-auto md:mx-0 md:w-[350px] h-52 px-2 mt-2 mb-10 relative"
                  >
                    <Link href={`/post/${post.slug}`}>
                      <div className="bg-gray-200 dark:bg-gray-700 w-full h-full relative rounded-md">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          height={300}
                          width={300}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="w-full absolute -bottom-12 left-0 px-4">
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg drop-shadow-lg flex flex-col px-1 py-1">
                            <p className="text-sm font-semibold line-clamp-3 md:text-base">
                              {post.title}
                            </p>
                            <p className="text-xs font-medium text-gray-400 mt-2 font-ralway">
                              Written By : {post.publisherName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
              return (
                <div
                  key={post._id}
                  className="w-full min-[410px]:w-[22rem] min-[480px]:w-[26rem] min-[550px]:w-[30rem] min-[410px]:mx-auto md:mx-0 md:h-64 md:w-[350px] px-6 mb-0 md:mb-0 mt-4 md:mt-2 relative overflow-hidden"
                >
                  <Link href={`/post/${post.slug}`}>
                    <div className="md:w-full md:h-full rounded-lg drop-shadow-lg bg-gray-200 dark:bg-gray-800 px-1 py-1 grid grid-cols-3 md:grid-rows-2 md:grid-cols-none">
                      <div className="col-span-2 self-center">
                        <p className="text-sm md:text-base font-semibold line-clamp-3 md:line-clamp-4">
                          {post.title}
                        </p>
                        <p className="text-xs font-medium text-gray-400 font-ralway">
                          Written By : {post.publisherName}
                        </p>
                      </div>
                      <div className="w-full h-full overflow-hidden rounded-lg md:col-span-2 md:row-start-1 md:row-end-2">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          height={400}
                          width={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
