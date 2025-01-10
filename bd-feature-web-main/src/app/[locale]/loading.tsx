"use client";

import { useTranslations } from "next-intl";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";

const Loading = () => {
  const t = useTranslations("landing-page");
  return (
    <div className="w-screen h-[95vh] flex flex-col justify-center items-center">
      <LoadingSpinner className="w-8 h-8 fill-primary-default" />
      <h3 className="font-medium animate-pulse mt-2">{t("news-loading")}</h3>
    </div>
  );
};

export default Loading;
