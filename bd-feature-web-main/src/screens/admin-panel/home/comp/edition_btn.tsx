import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { SectionData } from "../interfaces/interfaces";

interface EditionBtnProps {
  selectedEdition: string;
  setSelectedEdition: Dispatch<SetStateAction<string>>;
  sectionData: SectionData[];
  onUploadChangesHandler?: () => void;
}

const EditionBtn: React.FC<EditionBtnProps> = (props) => {
  if (props.sectionData.length !== 0) {
    return (
      <div className="w-screen flex flex-row items-center justify-center mt-16">
        <button
          onClick={props.onUploadChangesHandler}
          className="text-sm font-medium bg-primary-tints-400 dark:bg-primary-shades-600 px-4 py-2 rounded-md"
        >
          Upload Changes
        </button>
      </div>
    );
  }
  return (
    <div className="w-screen flex flex-row items-center justify-center mt-16">
      <div className="w-40 h-7 rounded-full flex flex-row items-center">
        <button
          className={clsx(
            "w-1/2 h-full  rounded-tl-full rounded-bl-full text-sm text-nowrap text-ellipsis px-2 transition-300",
            {
              "bg-primary-tints-600 dark:bg-primary-shades-700":
                props.selectedEdition === "Global",
              "bg-gray-200 dark:bg-gray-900":
                props.selectedEdition !== "Global",
            }
          )}
          onClick={() => props.setSelectedEdition("Global")}
        >
          Global
        </button>
        <button
          className={clsx(
            "w-1/2 h-full rounded-tr-full rounded-br-full text-sm text-nowrap text-ellipsis relative overflow-hidden px-2 transition-300",
            {
              "bg-primary-tints-600 dark:bg-primary-shades-700":
                props.selectedEdition === "Bangladesh",
              "bg-gray-200 dark:bg-gray-900":
                props.selectedEdition !== "Bangladesh",
            }
          )}
          onClick={() => props.setSelectedEdition("Bangladesh")}
        >
          Bangladesh
        </button>
      </div>
    </div>
  );
};

export default EditionBtn;
