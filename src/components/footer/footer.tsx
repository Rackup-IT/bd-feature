import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { TiSocialYoutube } from "react-icons/ti";

const Footer = () => {
  const t = useTranslations("footer");

  const footerSectionOne = [
    {
      title: t("editorial-policies"),
      href: "/",
    },
    {
      title: t("community-standards"),
      href: "/",
    },
    {
      title: t("republishing-guidelines"),
      href: "/",
    },
    {
      title: t("analytics"),
      href: "/",
    },
    {
      title: t("our-feeds"),
      href: "/",
    },
    {
      title: t("get-newsletter"),
      href: "/newsletter/subscribe",
    },
  ];

  const footerSectionTwo = [
    {
      title: t("who-we-are"),
      href: "/",
    },
    {
      title: t("our-charter"),
      href: "/",
    },
    {
      title: t("our-team"),
      href: "/",
    },
    {
      title: t("partner-founder"),
      href: "/",
    },
    {
      title: t("resrouce-for-media"),
      href: "/",
    },
    {
      title: t("contact-us"),
      href: "/contact-us",
    },
  ];

  return (
    <div className="w-screen flex flex-col bg-gray-900 items-center text-white">
      <div className="w-screen flex flex-col lg:flex-row pt-6  mt-10">
        <div className="w-full flex flex-col-reverse sm:flex-row-reverse sm:justify-around">
          <div className="flex flex-col items-center">
            {footerSectionOne.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="my-2 text-sm md:text-base"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            {footerSectionTwo.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="my-2 text-sm md:text-base"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-6">
          <div className="my-3 flex w-full justify-center flex-row">
            <Link href={""} className="size-11 lg:size-14 mx-2">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex flex-col justify-center items-center">
                <FaFacebookF className="fill-blue-600 size-5 lg:size-7" />
              </div>
            </Link>
            <Link href={""} className="size-11 lg:size-14 mx-2">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex flex-col justify-center items-center">
                <FaLinkedinIn className="fill-blue-600 size-5 lg:size-7" />
              </div>
            </Link>
            <Link href={""} className="size-11 lg:size-14 mx-2">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex flex-col justify-center items-center">
                <BsTwitterX className="fill-foreground size-5 lg:size-7" />
              </div>
            </Link>
            <Link href={""} className="size-11 lg:size-14 mx-2">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex flex-col justify-center items-center">
                <TiSocialYoutube className="fill-red-700 size-5 lg:size-7" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center max-lg:hidden">
            <Link
              href={"/privacy-policy"}
              className="my-2 text-sm mt-4 font-semibold md:text-base"
            >
              {t("privacy-policy")}
            </Link>
            <Link
              href={"/terms-and-conditions"}
              className="my-2 text-sm font-semibold md:text-base"
            >
              {t("terms-conditions")}
            </Link>
          </div>
        </div>
        <div className="lg:hidden flex flex-col items-center">
          <Link
            href={"/privacy-policy"}
            className="my-2 text-sm mt-4 font-semibold md:text-base"
          >
            {t("privacy-policy")}
          </Link>
          <Link
            href={"/terms-and-conditions"}
            className="my-2 text-sm font-semibold md:text-base"
          >
            {t("terms-conditions")}
          </Link>
        </div>
        <p className="text-xs text-center mt-4 lg:hidden">{t("copyright")}</p>
      </div>
      <p className="text-xs text-center mt-8 max-lg:hidden">{t("copyright")}</p>
    </div>
  );
};

export default Footer;
