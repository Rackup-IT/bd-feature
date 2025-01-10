"use client";

import clsx from "clsx";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

import { MdCopyAll } from "react-icons/md";
import { Link } from "../../i18n/routing";

import AdminModel from "../../interfaces/admin";
import PostModel from "../../interfaces/post";

interface AuthorScreenProps {
  author: unknown;
  posts: unknown;
}

const AuthorScreen: React.FC<AuthorScreenProps> = (props) => {
  const [isProfileView, setIsProfileView] = useState(true);
  const authorModel = props.author as AdminModel;
  const articles = props.posts as PostModel[];

  const copyTextToClipboard = async (email: string) => {
    await navigator.clipboard.writeText(email);
  };

  return (
    <div className="mt-16 h-screen overflow-y-scroll flex flex-col dynamic-width-for-screens mx-auto">
      <div className="flex flex-row items-center mt-5">
        <div className="size-24 relative overflow-hidden">
          <Image
            src={authorModel.profilePic}
            alt="Author Profile Image"
            height={300}
            width={300}
            className="size-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4">
          <h1 className="font-bold text-lg">{authorModel.name}</h1>
          <p className="font-medium text-sm">{authorModel.work}</p>
          <div className="flex flex-row items-center">
            <p className="font-medium text-sm mt-2">{authorModel.email}</p>
            <button
              onClick={() => copyTextToClipboard(authorModel.email)}
              className="size-6 mt-1 ml-3"
            >
              <MdCopyAll className="size-full" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start mx-2 mt-10 mb-5">
        <button
          onClick={() => setIsProfileView(true)}
          className={clsx(
            "px-6 py-1 rounded-full font-semibold",
            isProfileView ? "bg-primary-tints-400" : "bg-gray-300"
          )}
        >
          Profile
        </button>
        <button
          onClick={() => setIsProfileView(false)}
          className={clsx(
            "px-6 py-1 rounded-full font-semibold ml-2",
            !isProfileView ? "bg-primary-tints-400" : "bg-gray-300"
          )}
        >
          Articles
        </button>
      </div>
      {isProfileView ? (
        <div className="mx-2">
          <p className="text-base font-medium">{authorModel.bio}</p>
        </div>
      ) : (
        <ul className="flex flex-col mx-2">
          {articles.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-col min-[550px]:w-[550px] min-[650px]:w-[650px] min-[550px]:mx-auto my-5"
              >
                <Link href={`/post/${item.slug}`}>
                  <p className="text-xs font-medium">
                    {moment(item.updatedAt).format("MMMM DD YYYY , h:mm:s a")}
                  </p>
                  <div className="flex flex-row">
                    <div className="w-96 h-30 relative overflow-hidden mr-3 max-[550px]:hidden">
                      <Image
                        src={item.thumbnail}
                        alt="Author Profile Image"
                        height={300}
                        width={300}
                        className="size-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold ">{item.title}</h3>
                  </div>
                  <p className="text-xs font-medium mt-1">
                    writter : {item.publisherName}
                  </p>
                  <div
                    className="line-clamp-4 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: item.article }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AuthorScreen;
