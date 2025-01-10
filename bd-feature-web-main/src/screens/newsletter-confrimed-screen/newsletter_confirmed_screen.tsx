"use client";

import { useTranslations } from "next-intl";

interface NewsletterConfirmedScreenProps {
  locale: string;
}

const NewsletterConfirmedScreen: React.FC<NewsletterConfirmedScreenProps> = (
  props
) => {
  const t = useTranslations("newletter-confirm-screen");

  return (
    <div className="mt-20 flex flex-col px-2 sm:w-[30rem] md:w-[40rem] lg:w-[50rem] sm:mx-auto mb-10">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        {t("thank-you")}
      </h1>
      <p className="mt-3 text-base sm:text-lg md:text-xl">{t("text-one")}</p>
      <p className="mt-8 text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
        {t("title-one")}
      </p>
      <p className="mt-2 text-base sm:text-lg md:text-xl">{t("text-two")}</p>
      <p className="mt-8 text-base font-semibold sm:text-lg md:text-xl">
        {t("title-two")}
      </p>
      <ul className="mt-2 list-decimal text-base sm:text-lg md:text-xl">
        <li>{t("item-one")}</li>
        <li>{t("item-two")}</li>
        <li>{t("item-three")}</li>
      </ul>
    </div>
  );
};

export default NewsletterConfirmedScreen;
