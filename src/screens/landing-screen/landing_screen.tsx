"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import HighLightedPostComp from "@/components/highlighted-post-comp/highlighted_post_comp";
import NormalPostComp from "@/components/normal-post-comp/normal_post_comp";
import { Link } from "@/i18n/routing";
import { NavigationItemProps } from "@/interfaces/navigation_item";
import clsx from "clsx";
import Image from "next/image";
import { SectionDataToView } from "../admin-panel/home/interfaces/interfaces";

interface LandingScreenProps {
  sectionLists: SectionDataToView[];
  navigationData: NavigationItemProps[];
}

const LandingScreen: React.FC<LandingScreenProps> = (props) => {
  const t = useTranslations("landing-page");
  const pathName = usePathname();
  const selectedPathName = pathName.split("/")[2];

  return (
    <>
      <div className="mt-16 w-full sm:mt-8 sm:mx-auto dynamic-width-for-screens">
        <ul className="w-full flex-row relative px-2 hidden sm:flex">
          {props.navigationData.map((navItem) => {
            return (
              <li
                key={navItem._id}
                className={clsx("text-sm font-semibold relative mr-3", {
                  "after:w-full after:border-b-4 after:border-primary-default after:content-[''] after:absolute after:top-7 after:left-0":
                    navItem.value === selectedPathName,
                })}
              >
                <Link href={"/" + navItem.value}>{navItem.name}</Link>
              </li>
            );
          })}
        </ul>
        {!props.sectionLists ||
        props.sectionLists.length === 0 ||
        props.sectionLists[0].posts.length === 0 ? (
          <div className="mt-16 w-full flex flex-col justify-center items-center">
            <div className="w-full h-72 min-[380px]:w-72 sm:h-96 sm:w-96 relative overflow-hidden">
              <Image
                src={
                  "https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--error-search-result-state-page-empty-states-pack-design-development-illustrations-3363936.png?f=webp"
                }
                alt="Not found News Image"
                height={500}
                width={500}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xl font-bold mb-10">Not Found News For Now!</p>
          </div>
        ) : (
          props.sectionLists.map((sections, index) => {
            return (
              <section
                key={index}
                className="w-full grid grid-cols-3 gap-4 mb-8 px-3 sm:grid-cols-12 sm:gap-6 sm:mt-12"
              >
                {sections.title && (
                  <h1
                    className={clsx(
                      "col-span-full font-bold text-lg relative after:w-24 after:border-b-2 after:border-primary-default after:content-[''] after:absolute after:top-8 after:left-0",
                      "sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl",
                      "sm:mb-6",
                      "sm:after:border-b-4 md:after:top-9 xl:after:top-10 2xl:after:top-12"
                    )}
                  >
                    {sections.title}
                  </h1>
                )}
                {sections.posts.map((post) => {
                  return post.highlight ? (
                    <HighLightedPostComp
                      key={post._id}
                      title={post.title}
                      href={`/post/${post.slug}`}
                      publisherName={post.publisherName}
                      thumbnail={post.thumbnail}
                      altText={post.thumbnailAltText}
                    />
                  ) : (
                    <NormalPostComp
                      key={post._id}
                      href={`/post/${post.slug}`}
                      title={post.title}
                      publisherName={post.publisherName}
                      thumbnail={post.thumbnail}
                      altText={post.thumbnailAltText}
                    />
                  );
                })}
              </section>
            );
          })
        )}
      </div>
    </>
  );
};

export default LandingScreen;
