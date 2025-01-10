"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { SlArrowDown } from "react-icons/sl";

import clsx from "clsx";

interface EditionListProps {
  edition: string;
  onclick: () => void;
  className?: string;
}

const EditionList: React.FC<EditionListProps> = (props) => {
  const router = useRouter();
  const opositeEdition = props.edition === "/gl" ? "/bd" : "/gl";

  const editionList: Record<string, Record<string, string>> = {
    "/gl": {
      flag: "/images/un-flag.png",
      name: "Global",
    },
    "/bd": {
      flag: "/images/bd-flag.png",
      name: "বাংলাদেশ",
    },
  };

  return (
    <div className={clsx(props.className, "w-full px-4 flex flex-col group")}>
      <button className="w-full h-12 rounded-md border border-gray-300 dark:border-gray-600 flex flex-row justify-between items-center px-3">
        <div className="h-full flex flex-row items-center">
          <div className="h-full w-10 relative py-2">
            <Image
              src={editionList[props.edition].flag}
              alt={"UN flag"}
              height={80}
              width={80}
              className="h-full w-full object-cover rounded-md"
            />
          </div>
          <h2 className="ml-2 font-medium">
            {editionList[props.edition].name}
          </h2>
        </div>
        <div className="w-3 h-3 transform rotate-180 transition-300 group-hover:rotate-0 group-active:rotate-0">
          <SlArrowDown className="w-full h-full" />
        </div>
      </button>
      <div className="w-full px-3 mt-2 transition-300 opacity-0 transform scale-y-0 origin-top group-hover:scale-y-100 group-active:scale-y-100 group-hover:opacity-100 group-active:opacity-100">
        <button
          onClick={props.onclick}
          className="w-full flex flex-row justify-start items-center bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 hover:dark:bg-slate-800 px-2 py-3 rounded-md drop-shadow-sm transition-300"
        >
          <div className="w-8 h-6 relative overflow-hidden rounded-sm ">
            <Image
              src={editionList[opositeEdition].flag}
              alt="Bangladeshi flag"
              height={85}
              width={85}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-medium text-sm ml-2">
            {editionList[opositeEdition].name}
          </h2>
        </button>
      </div>
    </div>
  );
};

export default memo(EditionList);
