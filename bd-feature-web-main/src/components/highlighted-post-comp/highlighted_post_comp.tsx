import clsx from "clsx";
import Image from "next/image";
import { Link } from "../../i18n/routing";

interface HighLightedPostCompProps {
  thumbnail: string;
  title: string;
  publisherName: string;
  href: string;
  altText: string;
}

const HighLightedPostComp: React.FC<HighLightedPostCompProps> = (props) => {
  return (
    <div
      className={clsx(
        "col-span-full row-span-2 bg-gray-100 relative overflow-hidden rounded-sm drop-shadow-lg min-h-96 group hover:cursor-pointer",
        "sm:col-span-6"
      )}
    >
      <Link href={props.href}>
        <Image
          src={props.thumbnail}
          alt={props.altText || props.title}
          height={1080}
          width={1920}
          priority
          className="w-full h-full object-cover"
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full h-3/5 bg-gradient-to-t from-black from-0% flex flex-col justify-end text-white px-3 pb-2 overflow-hidden",
            "xl:px-6 xl:pb-10"
          )}
        >
          <h1
            className={clsx(
              "text-xl font-bold line-clamp-4 font-ralway group-hover:underline group-hover:text-primary-tints-700",
              "xl:text-2xl"
            )}
          >
            {props.title}
          </h1>
          <p className="text-sm font-semibold mt-2">
            Writter : {props.publisherName}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default HighLightedPostComp;
