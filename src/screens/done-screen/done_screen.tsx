"use client";

import { useTranslations } from "next-intl";

import { Link } from "../../i18n/routing";

interface DoneScreenProps {
  locale: string;
}

const DoneScreen: React.FC<DoneScreenProps> = (props) => {
  const t = useTranslations("done-screen");

  return (
    <>
      <div className="w-full dynamic-width-for-screens mt-20 flex flex-col px-2 mx-auto mb-10">
        <p className="text-xl font-bold font-ralway sm:text-2xl transition-300">
          {t("heading-text")}
        </p>
        <div className="w-full mt-10 flex flex-col">
          <section className="w-full flex flex-col justify-center items-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-primary-tints-500 dark:bg-primary-shades-700 rounded-full flex flex-col items-center justify-center">
              <p className="text-3xl font-bold sm:text-4xl">1</p>
            </div>
            <div className="w-full flex flex-col items-start mt-4">
              <p className="text-base font-bold font-ralway sm:text-lg">
                {t("section-one.title")}
              </p>
              <p className="text-base mt-2 lg:w-[50rem]">
                {t("section-one.description")}
              </p>
              <Link
                href={`mailto:${process.env.GMAIL_USER}`}
                className="text-primary-tints-700 font-medium font-ralway dark:text-primary-shades-800 mt-1"
              >
                yarahman1660@gmail.com
              </Link>
            </div>
          </section>
          <section className="w-full flex flex-col justify-center items-center mt-10">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-primary-tints-500 dark:bg-primary-shades-700 rounded-full flex flex-col items-center justify-center">
              <p className="text-3xl font-bold sm:text-4xl">2</p>
            </div>
            <div className="w-full flex flex-col items-start mt-4">
              <p className="text-base font-bold font-ralway sm:text-lg">
                {t("section-two.title")}
              </p>
              <p className="text-base mt-2 lg:w-[50rem]">
                {t("section-two.description")}
              </p>
              <div className="w-full flex justify-center items-center mt-8">
                <Link
                  href={"/newsletter/subscribe"}
                  className="bg-primary-tints-500 dark:bg-primary-shades-700 px-6 sm:px-12 py-2 rounded-lg"
                >
                  {t("section-two.button-text")}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DoneScreen;
