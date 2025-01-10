"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import { MdError } from "react-icons/md";
import RootOverlay from "../../../../components/overlay/overlay";
import useHttpRequest from "../../../../hooks/api/useApiRequest";
import CustomTextField from "../../text-field/text_field";

interface NavigationProps {
  name: string;
  value: string;
}

interface AddNavigationModelSheetProps {
  openAddNavigationOverlay: boolean;
  selectedEdition: string;
  backdropClick: (bool: boolean) => void;
  setSelectedEdition: (edition: string) => void;
  setReloadNavigation: Dispatch<SetStateAction<boolean>>;
}

const AddNavigationModelSheet: React.FC<AddNavigationModelSheetProps> = ({
  openAddNavigationOverlay,
  selectedEdition,
  backdropClick,
  setSelectedEdition,
  setReloadNavigation,
}: AddNavigationModelSheetProps) => {
  const { sendRequest, error, loading } = useHttpRequest();

  const [newNavigation, setNewNavigation] = useState<NavigationProps>({
    name: "",
    value: "",
  });

  const onAddHandler = async () => {
    try {
      await sendRequest("/api/admin/navigation", {
        method: "POST",
        body: JSON.stringify({ ...newNavigation, edition: selectedEdition }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setNewNavigation({ name: "", value: "" });
      setReloadNavigation((prev) => !prev);
      backdropClick(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootOverlay
      useBackdrop={openAddNavigationOverlay}
      onBackdropClick={() => backdropClick(false)}
      className={clsx(
        "h-5/6 w-full bg-gray-200 dark:bg-gray-800 bottom-0 left-0 rounded-t-md px-2 py-2 flex flex-col transform transition-300 overflow-y-scroll",
        {
          "translate-y-0": openAddNavigationOverlay,
          "translate-y-full": !openAddNavigationOverlay,
        }
      )}
    >
      <div className="w-full flex flex-row justify-center">
        <div className="w-20 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="w-full flex flex-col mt-4">
        <h1 className="font-ralway text-base font-medium">
          Add New Navigation (
          {selectedEdition === "gl" ? "Global" : "Bangladesh"})
        </h1>

        {error?.message && (
          <div className="w-full h-max flex flex-row items-center mt-4 mb-2 bg-red-200 dark:bg-red-900 px-2 py-2 rounded-md">
            <MdError size={30} className="fill-blue-600" />
            <div className="w-full h-max">
              <p className="text-sm ml-4">{error?.message}</p>
            </div>
          </div>
        )}

        <div className="w-full flex flex-row justify-center items-center mt-5">
          <div className="w-40 h-7 rounded-full relative flex flex-row">
            <button
              onClick={() => setSelectedEdition("gl")}
              className={clsx("w-1/2 h-full rounded-tl-full rounded-bl-full", {
                "bg-primary-tints-500 dark:bg-primary-shades-800":
                  selectedEdition === "gl",
                "bg-gray-300 opacity-50": selectedEdition !== "gl",
              })}
            >
              GL
            </button>
            <button
              onClick={() => setSelectedEdition("bd")}
              className={clsx(
                "w-1/2 h-full rounded-tr-full rounded-br-full transition-300",
                {
                  "bg-primary-tints-500 rounded-tr-full rounded-br-full opacity-100 dark:bg-primary-shades-800":
                    selectedEdition === "bd",
                  "bg-gray-300 opacity-50": selectedEdition !== "bd",
                }
              )}
            >
              BD
            </button>
          </div>
        </div>
        <CustomTextField
          classNameLabel="text-sm"
          label="Navigation Name"
          value={newNavigation.name}
          onTextChange={(e) => {
            const value = e.target.value;
            setNewNavigation((prev) => {
              if (prev) {
                return { ...prev, name: value };
              }
              return { name: value, value: "" };
            });
          }}
          className="mt-4"
          placeholder="ex. Science + Arts"
        />
        <CustomTextField
          classNameLabel="text-sm"
          value={newNavigation.value}
          label="Value"
          onTextChange={(e) => {
            const value = e.target.value;
            setNewNavigation((prev) => {
              if (prev) {
                return { ...prev, value: value };
              }
              return { name: "", value: value };
            });
          }}
          className="mt-4"
          placeholder="ex. science-arts or sciencearts"
        />
        <div className="w-full flex flex-row justify-center mt-4">
          <button
            disabled={
              newNavigation?.name.length === 0 ||
              newNavigation?.value.length === 0 ||
              loading
            }
            onClick={onAddHandler}
            className={clsx(
              "px-6 py-2 rounded-md transition-300",

              {
                "bg-gray-300 dark:bg-gray-700 opacity-50":
                  (newNavigation?.name.length === 0 ||
                    newNavigation?.value.length === 0) &&
                  !loading,
                "bg-primary-tints-500 dark:bg-primary-shades-800 opacity-100":
                  newNavigation!.name.length !== 0 &&
                  newNavigation!.value.length !== 0 &&
                  !loading,
                "bg-gray-300 dark:bg-gray-700 opacity-50 animate-[opacity-up-down_500ms_ease-in-out_infinite_alternate]":
                  loading,
              }
            )}
          >
            <p>Add Navigation</p>
          </button>
        </div>
      </div>
    </RootOverlay>
  );
};

export default AddNavigationModelSheet;
