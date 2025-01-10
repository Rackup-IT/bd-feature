import clsx from "clsx";
import Image from "next/image";

import { Link } from "../../i18n/routing";

interface NormalPostCompProps {
  title: string;
  thumbnail: string;
  publisherName: string;
  href: string;
  className?: string;
  altText: string;
}

const NormalPostComp: React.FC<NormalPostCompProps> = (props) => {
  return (
    <div
      className={clsx(
        "col-span-full row-span-1 pt-4 overflow-hidden flex flex-col border-t border-gray-300 dark:border-gray-800 transition-300 group hover:cursor-pointer",
        "sm:col-span-3"
      )}
    >
      <Link
        href={props.href}
        className={clsx(
          "grid grid-cols-3 gap-x-2 transition-300",
          "sm:grid-rows-[auto,1fr] sm:grid-cols-none"
        )}
      >
        <div
          className={clsx(
            "col-span-2 flex flex-col relative overflow-hidden transition-300",
            "sm:row-start-2"
          )}
        >
          <h1
            className={clsx(
              "text-base font-ralway font-bold pr-4 line-clamp-6 group-hover:underline group-hover:text-primary-tints-700",
              "xl:text-lg"
            )}
          >
            {props.title}
          </h1>
        </div>
        <div
          className={clsx(
            "col-span-1 relative overflow-hidden aspect-square h-full transition-300",
            "sm:row-span-1 sm:col-span-2 sm:aspect-auto sm:h-24",
            "2xl:h-40"
          )}
        >
          <Image
            src={props.thumbnail}
            alt={props.altText || props.title}
            height={500}
            width={500}
            priority
            className="w-full h-full object-cover aspect-square transition-300"
          />
        </div>
      </Link>
      <p className="text-xs mt-2 text-gray-400">
        Writter : {props.publisherName}
      </p>
    </div>
  );
};

export default NormalPostComp;
