"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { SlReload } from "react-icons/sl";
import { NavigationItemProps } from "../../../interfaces/navigation_item";
import AddNavigationModelSheet from "./add-navigation-model-sheet/add_navigation_model_sheet";

interface AddInNavigationProps {
  setReloadNavigation: Dispatch<SetStateAction<boolean>>;
  navigationList: NavigationItemProps[];
  loading: boolean;
  onNavigationChange: (navigation: NavigationItemProps | null) => void;
}

const AddInNavigation: React.FC<AddInNavigationProps> = (props) => {
  const [openNavigations, setOpenNavigations] = useState<boolean>(false);
  const [openAddNavigationOverlay, setOpenAddNavigationOverlay] =
    useState<boolean>(false);
  const [selectedEdition, setSelectedEdition] = useState<string>("gl");
  const [selectedNavigation, setSelectedNavigation] =
    useState<NavigationItemProps | null>(null);

  return (
    <>
      <AddNavigationModelSheet
        selectedEdition={selectedEdition}
        openAddNavigationOverlay={openAddNavigationOverlay}
        backdropClick={setOpenAddNavigationOverlay}
        setSelectedEdition={setSelectedEdition}
        setReloadNavigation={props.setReloadNavigation}
      />
      <div className="w-full h-full mt-8 flex flex-col">
        <div className="w-full flex flex-row items-center justify-between">
          <label htmlFor="label" className="text-base font-medium">
            Add In Navigation
          </label>
          <button
            onClick={() => setOpenAddNavigationOverlay(true)}
            className="text-sm text-primary-tints-600 dark:text-primary-shades-800"
          >
            Add New
          </button>
        </div>
        <div className="w-full mt-4 px-2">
          <div className="w-full flex flex-col">
            <div className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-900 rounded-md flex flex-row justify-between items-center">
              <button
                className="w-9/12 flex flex-row items-start pl-2"
                onClick={() => setOpenNavigations((prev) => !prev)}
              >
                <p className="text-base font-medium">
                  {selectedNavigation
                    ? selectedNavigation.name
                    : "Select (Optional)"}
                </p>
              </button>
              <div className="w-3/12 flex flex-row items-center justify-between px-2">
                <MdKeyboardArrowDown
                  size={20}
                  className={clsx("transform transition-300", {
                    "rotate-180": openNavigations,
                  })}
                />
                <button
                  onClick={() => props.setReloadNavigation((prev) => !prev)}
                >
                  <SlReload
                    size={18}
                    className={props.loading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>
            <div
              className={clsx(
                "w-full mt-2 flex flex-col transition-300 relative overflow-hidden",
                {
                  "h-auto": openNavigations,
                  "h-0": !openNavigations,
                }
              )}
            >
              <button
                onClick={() => {
                  setSelectedNavigation(null);
                  props.onNavigationChange(null);
                  setOpenNavigations(false);
                }}
                className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-900 rounded-md flex flex-row my-1"
              >
                <p className="text-base font-medium">None</p>
              </button>

              {props.navigationList ? (
                props.navigationList.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedNavigation(item);
                        props.onNavigationChange(item);
                        setOpenNavigations(false);
                      }}
                      className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-900 rounded-md flex flex-row my-1"
                    >
                      <p className="text-base font-medium">{item.name}</p>
                    </button>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInNavigation;
