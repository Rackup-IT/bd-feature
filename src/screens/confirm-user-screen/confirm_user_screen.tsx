"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "../../i18n/routing";

import clsx from "clsx";
import { MdError } from "react-icons/md";
import useHttpRequest from "../../hooks/api/useApiRequest";

interface ConfirmUserScreenProps {
  locale: string;
}

const ConfirmUserScreen: React.FC<ConfirmUserScreenProps> = (props) => {
  const searchParams = useSearchParams();
  const t = useTranslations("user-confirm-screen");
  const { sendRequest, error, data } = useHttpRequest();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        await sendRequest(
          `/api/auth/verify?token=${searchParams.get("token")}`,
          {
            method: "POST",
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleRequest();
  }, [searchParams, sendRequest]);

  if (isLoading) {
    return (
      <div className="w-screen h-[50vh] flex flex-col justify-center items-center">
        <p className="text-lg font-semibold animate-pulse">
          {t("loading-text")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-[50vh] flex flex-col justify-center items-center">
        <MdError className="size-10 fill-red-500 sm:size-20" />
        <p className="text-lg font-semibold mt-2 text-center sm:text-xl md:text-2xl lg:text-3xl">
          {JSON.parse(error.message)[props.locale]}
        </p>
        <Link
          href={"/"}
          className="mt-4 sm:mt-8 sm:font-semibold px-6 py-2 bg-primary-tints-500 dark:bg-primary-shades-700 rounded-full"
        >
          Go To Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        className={clsx(
          "w-screen h-[50vh] flex flex-col justify-center items-center px-2"
        )}
      >
        <h1 className="w-full text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
          {(data as { [key: string]: string })[props.locale]}
        </h1>
        <Link
          href={"/auth/user"}
          className="bg-primary-tints-500 dark:bg-primary-shades-700 sm:font-semibold px-10 py-2 rounded-full mt-4"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default ConfirmUserScreen;
