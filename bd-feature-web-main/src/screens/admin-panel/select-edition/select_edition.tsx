"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface SelectEditionProps {
  className?: string;
  onChange: (edition: string) => void;
  edition: string;
}

const SelectEdition: React.FC<SelectEditionProps> = (props) => {
  const [openEditionList, setOpenEditionList] = useState<boolean>(false);

  useEffect(() => {
    props.onChange(props.edition);
  }, [props.edition, props]);

  return (
    <div className="w-full flex flex-col mt-4">
      <label htmlFor="edition" className="text-base font-medium">
        Select Edition
      </label>
      <button
        onClick={() => setOpenEditionList((prev) => !prev)}
        className={clsx(
          "w-full h-12  drop-shadow-sm rounded-md flex flex-col justify-center items-start px-3 mt-2",
          "bg-slate-200 dark:bg-slate-900"
        )}
      >
        <p className="font-medium text-base">{props.edition}</p>
      </button>
      {openEditionList && (
        <div className="w-full flex flex-col px-4">
          <button
            onClick={() => {
              if (props.edition === "Global") {
                props.onChange("Bangladesh");
              } else {
                props.onChange("Global");
              }
              setOpenEditionList(false);
            }}
            className={clsx(
              "w-full h-12  drop-shadow-sm rounded-md flex flex-col justify-center items-start px-3 mt-2",
              "bg-slate-200 dark:bg-slate-900"
            )}
          >
            <p className="font-medium text-base">
              {props.edition === "Global" ? "Bangladesh" : "Global"}
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectEdition;
